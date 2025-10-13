import express from "express";
import { AuthController } from "../controllers/auth.controller";


const router = express.Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.registerUser)
router.post("/verify", AuthController.verifyOtp)
router.post("/resend", AuthController.resendOtp)

export {router as authRouter}