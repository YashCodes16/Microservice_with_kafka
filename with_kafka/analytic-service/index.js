import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "analytic-service",
  brokers: ["localhost:9094"], 
});


const consumer = kafka.consumer({groupId : "analytic-service"});

const run = async () =>{
try{
  await consumer.connect()
  await consumer.subscribe({topics:["payment-successful","order-successful","email-successful"],fromBegining : true})
  console.log("Analytic-service consumer connected");

  await consumer.run({
    eachMessage : async ({topic, partition, message})=>{
        const value = message.value.toString()
        console.log("Analytic data received:", value);

        if(topic === "payment-successful"   ){
        const totalPurachase = JSON.parse(value).items.reduce((acc, item) => acc + item.price,0)
        console.log(`Total purchase amount is ${totalPurachase}`);
          console.log("Processing payment-successful event");
        }
        else if(topic === "order-successful"){
          console.log("Processing order-successful event");
        }
        else if(topic === "email-successful"){
          console.log("Processing email-successful event");
        }


    }
  })
}catch(err){
  console.error("Error connecting Kafka consumer:", err);
}
}
run()