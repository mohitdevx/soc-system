import { logSign, processSign } from "../utils/processSign";

type process = Array<processSign>

export class AgentController {
    public stream: logSign;
    private processes: process = [];

    constructor(stream: logSign) {
        this.stream = stream;
    }

    register(method: processSign) {
        this.processes.push(method)
        return method;
    }

    async run() {
        this.processes.forEach((process) => {
          const proc = process(this.stream)
          console.log("This is process -> ", proc)
        })
    }
}
