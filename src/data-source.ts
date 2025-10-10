import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import * as dotenv from "dotenv";

dotenv.config()
const { DB_HOST , DB_PORT , DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST || "localhost",
    port: 5432,
    username: DB_USER || "test",
    password: DB_PASSWORD || "test",
    database: DB_DATABASE || "test",
    synchronize: false,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
