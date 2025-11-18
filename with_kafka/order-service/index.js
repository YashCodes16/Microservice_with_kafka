import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["localhost:9094"], 
});

const producer = kafka.producer();
const consumer = kafka.consumer({groupId : "order-service"});

const run = async () =>{
try{
    await producer.connect()
  await consumer.connect()
  await consumer.subscribe({topic:"payment-successful",fromBegining : true})
  console.log("Order-service consumer connected");

  await consumer.run({
    eachMessage : async ({topic, partition, message})=>{
        const value = message.value.toString()
        // CREATE ORDER LOGIC
      const {items,userId} = JSON.parse(value)
      console.log("Order created for user:", userId, "with items:", items);
      producer.send({
        topic: "order-successful",
        messages: [
          {
            value: JSON.stringify({items, userId}),
          },
        ],
      })

    }
  })
}catch(err){
  console.error("Error connecting Kafka consumer:", err);
}
}
run()