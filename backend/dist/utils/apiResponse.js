"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    static created(res, message = "Created", data) {
        return res.status(201).send({
            message,
            status: "success",
            statusCode: 201,
            timeStamp: new Date().toISOString(),
            data
        });
    }
    static success(res, message = "success", data = null) {
        return res.status(200).send({
            message,
            status: "success",
            statusCode: 200,
            timeStamp: new Date().toISOString(),
            data
        });
    }
    static fail(res, message = "fail", statusCode = 400, err = null) {
        return res.status(200).send({
            message,
            status: "fail",
            statusCode,
            timeStamp: new Date().toISOString(),
            data: err
        });
    }
    static error(res, message = "error", statusCode = 500, err = null) {
        return res.status(200).send({
            message,
            status: "error",
            statusCode,
            timeStamp: new Date().toISOString(),
            data: err
        });
    }
}
exports.ApiResponse = ApiResponse;
