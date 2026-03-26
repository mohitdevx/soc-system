import { kafkaConsumer, kafkaProducer } from "../config/kafka";
import { prisma } from "../config/prisma.client";
import { StreamsScalarFieldEnum } from "../generated/prisma/internal/prismaNamespace";
import { logSign } from "../utils/processSign";


export const kafkaService = async (stream: logSign): Promise<void> => {
    kafkaProducer.send({
        topic: "log-stream",
        messages: [
            { value: JSON.stringify(stream) }
        ]
    })
}


const savelogs = async (logs: object) => {
    const saved = await prisma.streams.create({
        data: {
            orgId: "myorgid",
            stream: logs
        }
    })

    if (!saved) {
        return "error encountering during entry"
    }
}

function decodeMessage(message: any) {
    console.log("this is raw data => ", message)
    const hexString = message.value.toString(); // hex string
    return hexString
}

export const saveLogsToDB = async () => {
    await kafkaConsumer.subscribe({ topic: 'log-stream', fromBeginning: true });

    await kafkaConsumer.run({
        eachBatch: async ({ batch, resolveOffset, heartbeat }) => {
            const records = [];

            for (const message of batch.messages) {
                try {
                    const parsed = decodeMessage(message);

                    records.push({
                        ...parsed,
                        partition: batch.partition,
                        offset: message.offset,
                    });

                } catch (err) {
                    console.error("Failed to parse message:", err);
                }
            }

            if (records.length > 0) {
                console.log("this is records => ", records)
            }

            for (const message of batch.messages) {
                resolveOffset(message.offset);
            }

            await heartbeat();
        },
    });
}

