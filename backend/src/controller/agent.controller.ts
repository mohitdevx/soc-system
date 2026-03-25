import { agentStream, processSign } from "../utils/processSign";

interface funcSign {
    name: string
    func: processSign
}

type process = Array<funcSign>

export class AppEngine {
    public dataStreams: agentStream;
    private processes: process = [];

    constructor(dataStreams: agentStream) {
        this.dataStreams = dataStreams;
    }

    register(func: funcSign) {
        this.processes.push(func)
    }

    async run() {
        for (const stream of this.dataStreams.streams) {
            for (const process of this.processes) {
                if (process?.name === 'universal') {
                    await process.func(stream)
                }
                if (process?.name === stream?.log_name) {
                    await process.func(stream)
                }
            }
        }
    }
}
