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
