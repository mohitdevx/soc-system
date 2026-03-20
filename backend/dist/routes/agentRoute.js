"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentRoute = void 0;
const express_1 = require("express");
const apiResponse_1 = require("../utils/apiResponse");
const errorClass_1 = require("../utils/errorClass");
const agent_service_1 = require("../service/agent.service");
const agent_controller_1 = require("../controller/agent.controller");
const brute_1 = require("../service/brute");
exports.agentRoute = (0, express_1.Router)();
exports.agentRoute.get("/health", (req, res) => {
    apiResponse_1.ApiResponse.success(res, "successfull", { msg: "hello this is response" });
});
exports.agentRoute.get("/error", (req, res) => {
    throw new errorClass_1.AppError("this is custom apperror", 400);
});
exports.agentRoute.post("/stream", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pipeline = new agent_controller_1.AppEngine(req.body);
    pipeline.register({ name: 'apache2.log', func: agent_service_1.logParser });
    pipeline.register({ name: 'apache2.log', func: brute_1.bruteForceDectection });
    pipeline.register({ name: 'apache2.log', func: brute_1.bruteAction });
    yield pipeline.run();
    console.log(pipeline.dataStreams);
    return apiResponse_1.ApiResponse.success(res, "success");
}));
