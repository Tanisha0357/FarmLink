import { Router } from "express";
import { verifyJWT } from "../MiddleWare/Auth.middleWare.js";
import {
  placeOrder,
  getMyOrdersBuyer,
  getMyOrdersFarmer,
  updateOrderStatus,
} from "../Controllers/Order.controller.js";

const router = Router();

router.post("/place", verifyJWT, placeOrder);

router.get("/buyer", verifyJWT, getMyOrdersBuyer);

router.get("/farmer", verifyJWT, getMyOrdersFarmer);

router.put("/:id/status", verifyJWT, updateOrderStatus);

export default router;
