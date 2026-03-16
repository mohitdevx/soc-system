import { promises } from "node:dns";

export interface logSign {
    agent_id: string;
    agent_name: string;
    version: string;
    raw: string
    data?: any
    signal?: boolean
}

export type processSign = (streams: logSign) => logSign | Promise<any>

