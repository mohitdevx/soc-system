import { createClient } from "redis";

export const redis = createClient().on('err', (err) =>
    console.log("Error connecting Redis", err))
    .connect();


