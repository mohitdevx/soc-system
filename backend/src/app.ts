import express, { Express } from "express";
import cors from "cors";
import { agentRoute } from "./routes/agentRoute";
import { globalErrorHandler } from "./utils/globalError";
import msgpack from "msgpack-lite";
import { ApiResponse } from "./utils/apiResponse";

export const app: Express = express();

// application middleware
const appMiddleware = [
  express.json(),
  cors(),
  express.urlencoded({ extended: true }),
];


//Msg-pack Handler 
app.use((req, res, next) => {
  if (req.headers['content-type'] === 'application/msgpack') {
    let data: any = [];
    req.on('data', chunk => data.push(chunk));
    req.on('end', () => {
      try {
        req.body = msgpack.decode(Buffer.concat(data));
        next();
      } catch (err) {
        return ApiResponse.fail(res, "bad request format", 400, err)
      }
    });
  } else {
    next();
  }
});

app.use(appMiddleware);
app.use("/api/v1/agent", agentRoute);
app.use(globalErrorHandler);

