import express from "express";
import {
  getAboutPage,
  getIndexPage,
  getLoginPage,
  getRegisterPage,
} from "../controllers/pageController.js";
import { isLoggedOut } from "../middlewares/isLoggedOut.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.route("/").get(getIndexPage);

router.route("/about").get(getAboutPage);

router.route("/register").get(isLoggedIn, getRegisterPage);

router.route("/login").get(isLoggedIn, getLoginPage);

export default router;
