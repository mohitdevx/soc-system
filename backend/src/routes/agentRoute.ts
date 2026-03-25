import { Router } from "express";
import { ApiResponse } from "../utils/apiResponse";
import { AppError } from "../utils/errorClass";
import { Request, Response } from "express";
import { logParser } from "../service/agent.service";
import { AppEngine } from "../controller/agent.controller";
import { bruteAction, bruteForceDectection } from "../service/brute";
import { kafkaService } from "../service/kafka.service";

export const agentRoute = Router();

agentRoute.get("/health", (req, res) => {
    ApiResponse.success(res, "successfull", { msg: "hello this is response" })
})


agentRoute.get("/error", (req, res) => {
    throw new AppError("this is custom apperror", 400)
})

agentRoute.post("/stream", async (req: Request, res: Response) => {
    const pipeline = new AppEngine(req.body);
    pipeline.register({ name: 'apache2.log', func: logParser });
    pipeline.register({ name: 'apache2.log', func: bruteForceDectection });
    pipeline.register({ name: 'apache2.log', func: bruteAction });
    pipeline.register({ name: 'universal', func: kafkaService });

    await pipeline.run()
    console.log(pipeline.dataStreams)
    return ApiResponse.success(res, "success")
});

