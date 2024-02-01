import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: "succes",
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).render("courses", {
      page_name: "courses",
      courses,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

export const getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    res.status(200).render("course", {
      page_name: "courses",
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
