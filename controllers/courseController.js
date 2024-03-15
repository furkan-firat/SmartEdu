import Course from "../models/Course.js";
import Category from "../models/Category.js";
import User from "../models/User.js";

export const createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      user: req.session.userID,
    });
    res.status(201).redirect("/courses");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.category;

    const query = req.query.search;

    const category = await Category.findOne({ slug: categorySlug });

    let filter = {};

    if (query) {
      filter = { name: query };
    }

    if (!query && !categorySlug) {
      (filter.name = ""), (filter.category = null);
    }

    if (categorySlug) {
      filter = { category: category._id };
    }

    const courses = await Course.find({
      $or: [
        { name: { $regex: ".*" + filter.name + ".*", $options: "i" } },
        { category: filter.category },
      ],
    })
      .sort({ _id: -1 })
      .populate("user");

    const categories = await Category.find();
    res.status(200).render("courses", {
      page_name: "courses",
      courses,
      categories,
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
    const categories = await Category.find({});
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      "user"
    );
    const user = await User.findById(req.session.userID);

    res.status(200).render("course", {
      page_name: "courses",
      course,
      categories,
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

export const enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.push({ _id: req.body.course_id });
    await user.save();

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

export const releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.pull({ _id: req.body.course_id });
    await user.save();

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
