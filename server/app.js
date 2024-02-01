// app.js
import express from "express";
import { config } from "dotenv";
import cors from "cors";

config({ path: "./config/config.env" });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define your routes here
app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
