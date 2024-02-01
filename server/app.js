import express from "express";
import { config } from "dotenv";
import paymentRoute from "./routes/PaymentRoutes.js";
import cors from "cors";
config({ path: "./config/config.env" });

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("https://main--heroic-puffpuff-8cd45f.netlify.app/api", paymentRoute);

app.get(
  "https://main--heroic-puffpuff-8cd45f.netlify.app/api/getkey",
  (req, res) => res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);
