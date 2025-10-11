import "reflect-metadata";
import * as express from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth.routes";
import passwordRoutes from "./routes/password.routes";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/auth", passwordRoutes);
AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
