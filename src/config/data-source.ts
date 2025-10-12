// src/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, MODE } = process.env;
console.log("Loaded DB Config:", {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  name: DB_NAME,
});
export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST || "localhost",
  port: Number(DB_PORT) || 5432,
  username: DB_USER || "postgres",
  password: DB_PASSWORD || "hashim1122",
  database: DB_NAME || "survey_app",
 synchronize: false,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
});
