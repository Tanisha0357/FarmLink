import { Router } from "express";
import { verifyJWT } from '../MiddleWare/Auth.middleWare.js'
import {
  setBuyerProfile,
  getBuyerProfile,
  getBuyerDashboard,
  getMarketplaceCrops,
  getCropDetailsForBuyer
} from "../Controllers/Buyer.controller.js";

const router = Router();

router.post("/profile", verifyJWT, setBuyerProfile);
router.get("/profile", verifyJWT, getBuyerProfile);

router.get("/dashboard", verifyJWT, getBuyerDashboard);

router.get("/marketplace", verifyJWT, getMarketplaceCrops);
router.get("/marketplace/:id", verifyJWT, getCropDetailsForBuyer);

export default router;
