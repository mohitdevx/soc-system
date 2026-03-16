import { debuglog } from "node:util";
import { redis } from "../config/redis";
import { logSign, processSign } from "../utils/processSign";
// Log Parser 

export const logParser = (stream: logSign): any => {
    const { raw } = stream;
    const regex = /^(\S+) (\S+) (\S+) \[(.*?)\] "((\S+) (\S+) (\S+))" (\d{3}) (\d+|-) "(.*?)" "(.*?)"/;
    const match = raw.match(regex);

    if (match) {
        const parsed = {
            "ip_addr": match[1],
            "date_time": match[4],
            "Request": {
                method: match[6],
                path: match[7],
                version: match[8]
            },
            "status_code": parseInt(match[9]),
            "size": match[10] === '-' ? 0 : parseInt(match[10]),
            "user_agent": match[12]
        };

        stream.data = parsed;
        return;
    }
}

export const bruteForceDectection = async (stream: logSign): Promise<any> => {
    const { ip_addr, date_time } = stream.data;
    const clinet = await redis;

    const value: any = await clinet.json.get(ip_addr);

    if (value) {
        await clinet.json.numIncrBy(ip_addr, '.count', 1);
        await clinet.json.set(ip_addr, '.lastseen', date_time);

        const current: any = await clinet.json.get(ip_addr, { path: ".count" });
        if (current >= 5) {
            console.log("brute force dectected !")
        }
    } else {
        await clinet.json.set(ip_addr, '.', {
            count: 1,
            datetime: date_time
        })
    }
}


