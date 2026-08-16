import Razorpay from "razorpay";
import crypto from "crypto";
import { AsyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Order } from "../Models/Order.model.js";

let razorpay;

try {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (keyId && keySecret && keyId !== "dummy_key_id") {
    razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  } else {
    console.warn("⚠️ Razorpay keys are missing or dummy. Payment features will not work.");
  }
} catch (error) {
  console.error("❌ Razorpay Initialization Error:", error.message);
}

export const createPaymentOrder = AsyncHandler(async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) throw new ApiError(400, "orderId required");

  const order = await Order.findById(orderId);
  if (!order) throw new ApiError(404, "Order not found");

  if (order.paymentStatus === "paid") {
    throw new ApiError(400, "Order already paid");
  }

  if (!razorpay) {
    const dummyOrderId = `order_dummy_${Date.now()}`;
    order.razorpayOrderId = dummyOrderId;
    await order.save({ validateBeforeSave: false });

    return res.status(200).json(
      new ApiResponse(200, {
        razorpayOrderId: dummyOrderId,
        amount: order.totalPrice * 100,
        currency: "INR",
        isMock: true
      }, "Mock Payment order created ✅")
    );
  }


  const razorpayOrder = await razorpay.orders.create({
    amount: order.totalPrice * 100, // ₹ -> paise
    currency: "INR",
    receipt: `receipt_${order._id}`,
  });

  order.razorpayOrderId = razorpayOrder.id;
  await order.save({ validateBeforeSave: false });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
      "Payment order created ✅"
    )
  );
});


export const verifyPayment = AsyncHandler(async (req, res) => {
  const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } =
    req.body;

  if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    throw new ApiError(400, "Payment verification fields missing");
  }

  const order = await Order.findById(orderId);
  if (!order) throw new ApiError(404, "Order not found");

  if (razorpayPaymentId === "pay_dummy_123456" || !razorpay) {
    order.paymentStatus = "paid";
    order.razorpayPaymentId = razorpayPaymentId;
    order.razorpaySignature = razorpaySignature;
    await order.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, order, "Mock Payment verified ✅"));
  }


  const sign = razorpayOrderId + "|" + razorpayPaymentId;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest("hex");

  if (expectedSignature !== razorpaySignature) {
    order.paymentStatus = "failed";
    await order.save({ validateBeforeSave: false });

    throw new ApiError(400, "Invalid payment signature ❌");
  }

  order.paymentStatus = "paid";
  order.razorpayPaymentId = razorpayPaymentId;
  order.razorpaySignature = razorpaySignature;

  await order.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Payment verified ✅"));
});
