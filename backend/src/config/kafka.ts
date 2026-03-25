import { Kafka } from "kafkajs";

const brocker = process.env.BROCKER || "localhost:9092";

const kafka = new Kafka({
    clientId: "soc-system",
    brokers: [brocker],
});

export const kafkaProducer = kafka.producer();

export const kafkaConsumer = kafka.consumer({ groupId: "soc-group" });

export const connectKafka = async () => {
    try {
        await kafkaProducer.connect();
        await kafkaConsumer.connect();
    } catch (error) {
        console.error("Error connecting to Kafka:", error);
        throw new Error("Failed to connect to Kafka");
    }
};

