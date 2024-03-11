import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourse,
} from "../controllers/courseController.js";
import checkUserRole from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.route("/").post(checkUserRole(["teacher", "admin"]), createCourse);
router.route("/").get(getAllCourses);
router.route("/:slug").get(getCourse);

export default router;
