export class AppError extends Error {
  public status: string;
  public statuscode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statuscode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "success";
    this.isOperational = true;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}


