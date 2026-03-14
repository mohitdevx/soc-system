import { createServer } from "node:http";
import { app } from "./app";
import { connection } from "./db/database";

const server = createServer(app);

type port = string | false;
const PORT: port = process.env.PORT || false;


connection();

server.listen(PORT, () =>
  console.log(`server is running on http://0.0.0.0:${PORT}`)
);
