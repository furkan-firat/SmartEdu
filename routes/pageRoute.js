import express from "express";
import {
  getAboutPage,
  getIndexPage,
  getLoginPage,
  getRegisterPage,
} from "../controllers/pageController.js";
import { redirectHome } from "../middlewares/redirectHome.js";

const router = express.Router();

router.route("/").get(getIndexPage);

router.route("/about").get(getAboutPage);

router.route("/register").get(redirectHome, getRegisterPage);

router.route("/login").get(redirectHome, getLoginPage);

export default router;
