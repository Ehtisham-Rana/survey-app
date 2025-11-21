import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from "dotenv";

dotenv.config()
const { DB_HOST , DB_PORT , DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;


//DB Connection
export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST || "localhost",
    port: Number(DB_PORT ||"5432"),
    username: DB_USER || "test",
    password: DB_PASSWORD || "hashim1122",
    database: DB_DATABASE || "survey_app",
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.{ts,js}"],
    migrations: ["./src/migration/**/*"],
    subscribers: [],
})
