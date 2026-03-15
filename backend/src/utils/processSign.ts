export interface logSign {
    agent_id: string;
    agent_name: string;
    version: string;
    raw: string
    signal?: boolean
}

export type processSign = (streams: logSign) => logSign

