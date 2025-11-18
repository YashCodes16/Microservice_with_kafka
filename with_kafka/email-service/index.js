import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "email-service",
  brokers: ["localhost:9094"], 
});

const producer = kafka.producer();
const consumer = kafka.consumer({groupId : "email-service"});

const run = async () =>{
try{
    await producer.connect()
  await consumer.connect()
  await consumer.subscribe({topic:"order-successful",fromBegining : true})
  console.log("email-service consumer connected");

  await consumer.run({
    eachMessage : async ({topic, partition, message})=>{
        const value = message.value.toString()
        console.log("Email service received order:", value);
        producer.send({
        topic: "email-successful",
        messages: [
          {
            value: "Flow email sent to user for order: " + value,
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