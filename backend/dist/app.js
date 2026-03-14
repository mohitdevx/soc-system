"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
// application middleware
const appMiddleware = [
    express_1.default.json(),
    (0, cors_1.default)(),
    express_1.default.urlencoded({ extended: true }),
];
exports.app.use(appMiddleware);
exports.app.get("/hello", (req, res) => {
    return res.status(200).json({ msg: "hello world ! server is working" });
});
