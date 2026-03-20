import { createServer } from "node:http";
import { app } from "./app";
import { connectionDB } from "./config/database";

const server = createServer(app);

type port = string | false;
const PORT: port = process.env.PORT || false;

connectionDB().then(() => {
  server.listen(PORT, () =>
    console.log(`server is running on http://0.0.0.0:${PORT}`)
  );
});
