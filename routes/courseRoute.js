import express from "express";
import {
  createCourse,
  enrollCourse,
  getAllCourses,
  getCourse,
  releaseCourse,
} from "../controllers/courseController.js";
import checkUserRole from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.route("/").post(checkUserRole(["teacher", "admin"]), createCourse);
router.route("/").get(getAllCourses);
router.route("/:slug").get(getCourse);
router.route("/enroll").post(enrollCourse);
router.route("/release").post(releaseCourse);

export default router;
