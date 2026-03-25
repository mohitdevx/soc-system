import { kafkaProducer } from "../config/kafka";
import { logSign } from "../utils/processSign";

export const kafkaService = async (stream: logSign): Promise<void> => {
    kafkaProducer.send({
        topic: "log-stream",
        messages: [
            { value: JSON.stringify(stream) }
        ]
    })
}

