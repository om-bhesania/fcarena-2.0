import express from "express";
import {
  checkout,
  paymentVerification,
} from "../controllers/PaymentControllers.js";

const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);

// router.route("/paymentres").get(checkpaymentstatus);

export default router;