import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

dotenv.config();

const sql = neon(process.env.DATABASE_URL!);

export const connectionDB = async () => {
  let db;
  try {
    db = drizzle({ client: sql });
    console.log("database connection successfull");
  } catch (error) {
    console.log("error connecting database");
    process.exit(1);
  }
  return db;
};
