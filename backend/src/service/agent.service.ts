import { logSign, processSign } from "../utils/processSign";
// Log Parser 

export const logParser = (stream: logSign): any => {
    const { raw } = stream;
    stream.raw = "this stream has been changed"
    stream.signal = false
    return stream;
}


export const func2 = (stream: logSign): any => {
    const { raw } = stream;
    stream.raw = "this stream has been changed second time"
    stream.signal = false
    return stream;
}



