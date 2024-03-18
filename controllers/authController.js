import Category from "../models/Category.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid email or password");
    }

    req.session.userID = user._id;
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect("/login");
    }
  });
};

export const getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    "courses"
  );
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID }).populate(
    "category"
  );
  const users = await User.find();
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
    courses,
    users,
  });
};

export const deleteCourse = async (req, res) => {
  try {
    await Course.findOneAndDelete({ slug: req.params.slug });

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Course.deleteMany({ user: req.params.id });

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
