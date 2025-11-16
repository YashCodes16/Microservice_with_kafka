import { Kafka } from "kafkajs";

//configure
const kafka = new Kafka({
  clientId: "kafka-service",
  brokers: ["localhost:9094"], // host machine port
});

//instance to connect
//admin is required for topics
const admin = kafka.admin();

//execute

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
