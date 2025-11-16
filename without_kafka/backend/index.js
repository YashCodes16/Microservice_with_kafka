import express from "express";
import cors from "cors";
import { pay, createOrder, sendEmail, logAnalytics } from "./db.js";

const app = express();

app.use(cors());

app.use(express.json());

app.post("/order", async (req, res, next) => {
  const { cart,userId } = req.body;
  console.log(req.body)

  const paymentResult = await pay(cart, userId);
  await logAnalytics({ cart, userId, paymentResult }, "Payment Successfull");
  const orderId = await createOrder(cart, userId);
  await logAnalytics({ orderId, userId }, "Order Created");
  const emailResult = await sendEmail(orderId, userId);
  await logAnalytics({ orderId, userId, emailResult }, "Email sent");

  return res.json({ orderId:orderId, userId, emailResult });
});


app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({message : err.message || "Something went wrong"});
});

export default app;
