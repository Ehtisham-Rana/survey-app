// src/routes/password.routes.ts
import { Router } from "express";
import { PasswordController } from "../controllers/password.controller";

const router = Router();

router.post("/forgot-password", PasswordController.forgotPassword);
router.post("/reset-password", PasswordController.resetPassword);

export default router;
