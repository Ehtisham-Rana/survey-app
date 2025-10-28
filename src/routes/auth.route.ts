import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { loginValidator, userValidator } from "../middleware/index";


const router = express.Router();

router.post("/login", loginValidator, AuthController.login);
router.post("/register", userValidator, AuthController.registerUser)
router.post("/verify-otp", AuthController.verifyOtp)
router.post("/resend-otp", AuthController.resendOtp)

export {router as authRouter}