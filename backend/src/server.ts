import { createServer } from "node:http";
import { app } from "./app";
import dotenv from "dotenv";
import { connectKafka } from "./config/kafka";

const server = createServer(app);

type port = string | false;
const PORT: port = process.env.PORT || false;


dotenv.config();
connectKafka().then(() => {
  server.listen(PORT, () =>
    console.log(`server is running on http://0.0.0.0:${PORT}`)
  );
})
