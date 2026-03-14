import express, { Express, Request, Response } from "express";
import cors from "cors";

export const app: Express = express();

// application middleware
const appMiddleware = [
  express.json(),
  cors(),
  express.urlencoded({ extended: true }),
];

app.use(appMiddleware);

app.get("/hello", (req: Request, res: Response): Response => {
  return res.status(200).json({ msg: "hello world ! server is working" });
});


