import { Router } from "express";
import { ApiResponse } from "../utils/apiResponse";
import { AppError } from "../utils/errorClass";
import { Request, Response } from "express";
import { AgentController } from "../controller/agent.controller";
import { bruteForceDectection, logParser } from "../service/agent.service";

export const agentRoute = Router();

agentRoute.get("/health", (req, res) => {
    ApiResponse.success(res, "successfull", { msg: "hello this is response" })
})
// agentRoute.post("")

agentRoute.get("/error", (req, res) => {
    throw new AppError("this is custom apperror", 400)
})

const demo = (data: any) => {
    console.log("this is data", data)
}

agentRoute.post("/stream", async (req: Request, res: Response) => {
    const pipeline = new AgentController(req.body)
    pipeline.register(logParser)
    pipeline.register(bruteForceDectection)
    await pipeline.run()
    return ApiResponse.success(res, "success", pipeline.stream)
})
