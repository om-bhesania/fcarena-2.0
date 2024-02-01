import { app } from "./app.js";
import Razorpay from "razorpay";
import cors from "cors";
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});
app.use(cors());

app.listen(
  "https://main--heroic-puffpuff-8cd45f.netlify.app/",
  (res) => res.send("server is running ")
  // console.log(`Server is working on ${process.env.PORT}`)
);
