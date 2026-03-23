import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;

export const redis = createClient({ url: redisUrl }).on('err', (err) =>
    console.log("Error connecting Redis", err))
    .connect();


