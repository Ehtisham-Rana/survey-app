import express from "express";
import { Usercontroller } from "../controllers/user.controller";
import { authenticate } from "../middleware/authentication";
import { authorize } from "../middleware/authorization";
const router = express.Router();

router.get("/users/", Usercontroller.findAll);
router.get("/user/:id", Usercontroller.findById);
router.put("/user/:id", authenticate, Usercontroller.updateUser);
router.delete("/user/:id", authenticate, Usercontroller.deleteUser);
// Only authenticated users can access
router.get("/profile", authenticate, Usercontroller.getProfile);


// Only admin can access this route
router.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});
export { router as userRouter };