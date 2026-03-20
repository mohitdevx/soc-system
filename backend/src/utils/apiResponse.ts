import { Response } from "express";

interface responsSchema {
    message: string;
    status: string;
    statusCode: number;
    timeStamp: string
    data?: any;
}

export class ApiResponse {
    static created(res: Response, message: string = "Created", data: any): Response<responsSchema> {
        return res.status(201).send({
            message,
            status: "success",
            statusCode: 201,
            timeStamp: new Date().toISOString(),
            data
        })
    }

    static success(res: Response, message: string = "success", data: any = null): Response<responsSchema> {
        return res.status(200).send({
            message,
            status: "success",
            statusCode: 200,
            timeStamp: new Date().toISOString(),
            data
        })
    }

    static fail(res: Response, message: string = "fail", statusCode: number = 400, err: any = null): Response<responsSchema> {
        return res.status(200).send({
            message,
            status: "fail",
            statusCode,
            timeStamp: new Date().toISOString(),
            data: err
        })
    }

    static error(res: Response, message: string = "error", statusCode: number = 500, err: any = null): Response<responsSchema> {
        return res.status(200).send({
            message,
            status: "error",
            statusCode,
            timeStamp: new Date().toISOString(),
            data: err
        })
    }
}
