import { logSign, processSign } from "../utils/processSign";
// Log Parser 

export const logParser: processSign = async (stream: logSign) => {
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
        return 
    }
}