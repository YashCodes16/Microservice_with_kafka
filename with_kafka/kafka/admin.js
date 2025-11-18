import { Kafka } from "kafkajs";


const kafka = new Kafka({
  clientId: "kafka-service",
  brokers: ["localhost:9094"], 
});


const admin = kafka.admin();



const run = async () => {
  try {
    await admin.connect();
    await admin.createTopics({
      topics: [
        {
          topic: "payment-successful",
        },
        {
          topic: "order-successful",
        },{
          topic: "email-successful",
        },{
          topic: "test-topic",
        },
      ],
    });
  } catch (err) {
    console.log(err);
  }
};

run();
