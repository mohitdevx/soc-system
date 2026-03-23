import { Response } from "express";

interface responseSchema {
    message: string;
    status: string;
    statusCode: number;
    timeStamp: string;
    data?: object | null;
}

export class ApiResponse {
    static created(res: Response<responseSchema>, message: string = "Created", data: object | null = null): Response<responseSchema> {
        return res.status(201).send({
            message,
            status: "success",
            statusCode: 201,
            timeStamp: new Date().toISOString(),
            data
        })
    }

    static success(res: Response<responseSchema>, message: string = "success", data: object | null = null): Response<responseSchema> {
        return res.status(200).send({
            message,
            status: "success",
            statusCode: 200,
            timeStamp: new Date().toISOString(),
            data
        })
    }

    static fail(res: Response<responseSchema>, message: string = "fail", statusCode: number = 400, data: object | null = null): Response<responseSchema> {
        return res.status(statusCode).send({
            message,
            status: "fail",
            statusCode,
            timeStamp: new Date().toISOString(),
            data
        })
    }

    static error(res: Response<responseSchema>, message: string = "error", statusCode: number = 500, data: object | null = null): Response<responseSchema> {
        return res.status(statusCode).send({
            message,
            status: "error",
            statusCode,
            timeStamp: new Date().toISOString(),
            data
        })
    }
}
