export interface logSign {
    agent_id: string;
    agent_name: string;
    version: string;
    type: string
    raw: string
    log_name: string
    data?: any
    signal: boolean
}

export interface agentStream {
    worker_id: string
    worker_name: string
    stream_count: number
    streams: logSign[]
    urls?: string[]
}

export type processSign = (streams: logSign) => void | Promise<void>

