import express from "express";
import {
  createUser,
  deleteUser,
  getDashboardPage,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/dashboard").get(authMiddleware, getDashboardPage);
router.route("/:id").delete(deleteUser);

export default router;
