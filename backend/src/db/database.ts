import dotenv from "dotenv";
import { exit } from "node:process";
dotenv.config();

type db = string | false;

const db_url: db = process.env.DATABASE_URL || false;

export const connection = () => {
  if (!db_url) {
    console.log("error connecting database");
    console.log(db_url);
    exit(0);
  }
  console.log("database connection successfull");
  console.log(db_url);
};
