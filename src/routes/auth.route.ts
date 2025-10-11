import * as express from "express";
import { AuthController } from "../controllers/auth.controller";


const router = express.Router();

router.post("/register", AuthController.registerUser)

export {router as authRouter}