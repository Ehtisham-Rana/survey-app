import * as express from "express";
import { Usercontroller } from "../controllers/user.controller";


const router = express.Router();

router.get("/user/", Usercontroller.findAll);
router.post("/user", Usercontroller.registerUser);
router.get("/user/:id", Usercontroller.findById);
router.put("/user/:id", Usercontroller.updateUser);
router.delete("/user/:id", Usercontroller.deleteUser);

export { router as userRouter };