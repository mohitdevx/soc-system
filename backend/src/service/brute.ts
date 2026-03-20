import { logSign } from "../utils/processSign";
import { redis } from "../config/redis";
import axios from "axios";

// BrutFoce Detection System 
export const bruteForceDectection = async (stream: logSign): Promise<void> => {
    console.log('this funcion called')
    const { ip_addr, date_time } = stream.data;
    const clinet = await redis;

    const value: any = await clinet.json.get(ip_addr);

    if (value) {
        await clinet.json.numIncrBy(ip_addr, '.count', 1);
        await clinet.json.set(ip_addr, '.lastseen', date_time);

        const current: any = await clinet.json.get(ip_addr, { path: ".count" });
        if (current >= 5) {
            console.log("brute force dectected !")
            stream.signal = true;
            console.log("this is signal" , stream.signal)
            stream.data = {
                action: `sudo iptables -A INPUT -s ${ip_addr} -j DROP`
            }
            return;
        }
    } else {
        await clinet.json.set(ip_addr, '.', {
            count: 1,
            datetime: date_time
        })
    }
}

export const bruteAction = async (stream: logSign, urls: string[] = []): Promise<void> => {
    console.log(stream?.signal)
    if (!stream.signal) {
        console.log("no signal found!")
        return;
    }

    await axios.post('http://localhost:5000/agent/action', stream.data).then((res) => {
        console.log(`This Request is from action =>`, res.data)
    }).catch((err) => {
        console.log(err)
    })
}