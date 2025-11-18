import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { Kafka } from "kafkajs";




const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["localhost:9094"], 
});


const producer = kafka.producer();
let app = express();

app.use(cors());

app.use(express.json());

const connectProducer = async () =>{
try{
  await producer.connect()
  console.log("Payment-service producer connected");
}catch(err){
  console.error("Error connecting Kafka producer:", err);
}
}

app.post("/payment-service", async (req, res) => {
  try {
    const {cart} = req.body;

    //get it from auth middleware   
    const userId = "YashCodes16";

    //TODO:payment
    const value = JSON.stringify({...cart,userId})
    console.log(value)
    //kafka
    await producer.send({
      topic : "payment-successful",
      messages : [
        {
          value 
        }
      ]
    })
    //return response

    return res.json({ orderId: uuidv4(), message: "Payment successful" }).status(200);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || "Payment failed");
});
app.listen(8000, () => {
  connectProducer();
  console.log("payment service is running on port 8000");
});
