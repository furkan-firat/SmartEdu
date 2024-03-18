import express from "express";
import {
  createCourse,
  deleteCourse,
  enrollCourse,
  getAllCourses,
  getCourse,
  releaseCourse,
  updateCourse,
} from "../controllers/courseController.js";
import checkUserRole from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.route("/").post(checkUserRole(["teacher", "admin"]), createCourse);
router.route("/").get(getAllCourses);
router.route("/:slug").get(getCourse);
router.route("/enroll").post(enrollCourse);
router.route("/release").post(releaseCourse);
router.route("/:slug").delete(deleteCourse);
router.route("/:slug").put(updateCourse);

export default router;
