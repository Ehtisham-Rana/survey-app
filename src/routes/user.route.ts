import * as express from "express";
import { Usercontroller } from "../controllers/user.controller";


const router = express.Router();

router.post("/user", Usercontroller.registerUser);

export { router as userRouter };