
import { app } from "./app.js";
import Razorpay from "razorpay";

export const instance = new Razorpay({
  key_id : process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

app.listen(process.env.PORT, () =>
  console.log(`Server is working on ${process.env.PORT}`)
);

// server.js
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { createServer } from "http";

config({ path: "./config/config.env" });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import and use API routes
import paymentRoute from "./api/PaymentRoutes.js";
app.use("/api", paymentRoute);

// Define other routes if needed

export default function handler(req, res) {
  app(req, res);
}

// Start the server
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  createServer(handler).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

