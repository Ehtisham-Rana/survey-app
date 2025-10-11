import "reflect-metadata";
import * as express from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import { userRouter } from "./routes/user.route";

//Configuration
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json())

//Routes
app.use("/api", userRouter)

//Server and DB initializing
AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
