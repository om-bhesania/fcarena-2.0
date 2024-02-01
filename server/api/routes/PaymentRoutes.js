import express from "express";
import { checkout, paymentVerification } from "../controllers/PaymentControllers";


const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);

// router.route("/paymentres").get(checkpaymentstatus);

export default router;