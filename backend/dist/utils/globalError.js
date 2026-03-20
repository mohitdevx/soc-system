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
exports.globalErrorHandler = void 0;
const apiResponse_1 = require("./apiResponse");
// Development Errors 
const devErrors = (err, req, res, next) => {
    const message = err.message || 'internal server error';
    const statusCode = err.statuscode || 500;
    return apiResponse_1.ApiResponse.error(res, message, statusCode, { stack: err === null || err === void 0 ? void 0 : err.stack, err: err });
};
// Production Errors 
const prodError = (err, req, res, next) => {
    const message = err.message || "something went wrong !";
    const statusCode = err.statuscode || 500;
    if (err.isOperational) {
        return apiResponse_1.ApiResponse.error(res, message, statusCode);
    }
    return apiResponse_1.ApiResponse.error(res, "something went wrong !", 500);
};
// Global Errorhandler 
const globalErrorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV === 'PRODUCTION') {
        return prodError(err, req, res, next);
    }
    return devErrors(err, req, res, next);
});
exports.globalErrorHandler = globalErrorHandler;
