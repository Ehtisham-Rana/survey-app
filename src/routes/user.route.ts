import * as express from "express";
import { Usercontroller } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
const router = express.Router();

router.get("/user/", Usercontroller.findAll);
router.get("/user/:id", Usercontroller.findById);
router.put("/user/:id", Usercontroller.updateUser);
router.delete("/user/:id", Usercontroller.deleteUser);
// Only authenticated users can access
router.get("/profile", authenticate, Usercontroller.getProfile);


// Only admin can access this route
router.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});
export { router as userRouter };