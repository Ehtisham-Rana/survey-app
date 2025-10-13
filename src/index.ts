import "reflect-metadata";
import express from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import { userRouter, authRouter, passwordRouter } from "./routes/index";


//Configuration
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json())

//Routes
app.get("/", (req, res) => {
  res.send(" Server is running successfully!");
});

app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api/v1/auth", passwordRouter);


console.log("Initializing database connection...");
console.log("DB_USER:", process.env.DB_USER);

//Server and DB initializing
AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
