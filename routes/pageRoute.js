import express from "express";
import {
  getAboutPage,
  getContactPage,
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

router.route("/contact").get(getContactPage);

export default router;
