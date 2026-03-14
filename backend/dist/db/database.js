"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const node_process_1 = require("node:process");
dotenv_1.default.config();
const db_url = process.env.DATABASE_URL || false;
const connection = () => {
    if (!db_url) {
        console.log("error connecting database");
        console.log(db_url);
        (0, node_process_1.exit)(0);
    }
    console.log("database connection successfull");
    console.log(db_url);
};
exports.connection = connection;
