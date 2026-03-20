"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const agentRoute_1 = require("./routes/agentRoute");
const globalError_1 = require("./utils/globalError");
const msgpack_lite_1 = __importDefault(require("msgpack-lite"));
const apiResponse_1 = require("./utils/apiResponse");
exports.app = (0, express_1.default)();
// application middleware
const appMiddleware = [
    express_1.default.json(),
    (0, cors_1.default)(),
    express_1.default.urlencoded({ extended: true }),
];
//Msg-pack Handler 
exports.app.use((req, res, next) => {
    if (req.headers['content-type'] === 'application/msgpack') {
        let data = [];
        req.on('data', chunk => data.push(chunk));
        req.on('end', () => {
            try {
                req.body = msgpack_lite_1.default.decode(Buffer.concat(data));
                next();
            }
            catch (err) {
                return apiResponse_1.ApiResponse.fail(res, "bad request format", 400, err);
            }
        });
    }
    else {
        next();
    }
});
exports.app.use(appMiddleware);
exports.app.use("/api/v1/agent", agentRoute_1.agentRoute);
exports.app.use(globalError_1.globalErrorHandler);
