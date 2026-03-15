import { Router } from "express";
import { ApiResponse } from "../utils/apiResponse";
import { AppError } from "../utils/errorClass";

export const agentRoute = Router();

agentRoute.get("/health", (req, res) => {
    ApiResponse.success(res, "successfull", { msg: "hello this is response" })
})
// agentRoute.post("")

agentRoute.get("/error", (req, res) => {
    throw new AppError("this is custom apperror", 400)
})
