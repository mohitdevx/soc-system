"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const app_1 = require("./app");
const database_1 = require("./db/database");
const server = (0, node_http_1.createServer)(app_1.app);
const PORT = process.env.PORT || false;
(0, database_1.connection)();
server.listen(PORT, () => console.log(`server is running on http://0.0.0.0:${PORT}`));
