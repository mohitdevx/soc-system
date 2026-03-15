import express, { Express } from "express";
import cors from "cors";
import { agentRoute } from "./routes/agentRoute";
import { globalErrorHandler } from "./utils/globalError";

export const app: Express = express();

// application middleware
const appMiddleware = [
  express.json(),
  cors(),
  express.urlencoded({ extended: true }),
];

app.use(appMiddleware);
app.use("/api/v1/agent", agentRoute);
app.use(globalErrorHandler);

