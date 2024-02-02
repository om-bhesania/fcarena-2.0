
import express from "express";
import { config } from "dotenv";
import paymentRoute from "./routes/PaymentRoutes.js";
import cors from "cors";
config({ path: "./config/config.env" });

export const app = express();


// app.js
import express from "express";
import { config } from "dotenv";
import cors from "cors";

config({ path: "./config/config.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", paymentRoute);

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);
=======
// Define your routes here
app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;

