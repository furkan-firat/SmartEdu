import nodemailer from "nodemailer";
import Course from "../models/Course.js";
import User from "../models/User.js";

export const getIndexPage = async (req, res) => {
  const totalCourses = await Course.find().countDocuments();
  const totalStudents = await User.countDocuments({ role: "student" });
  const totalTeachers = await User.countDocuments({ role: "teacher" });
  res.status(200).render("index", {
    page_name: "index",
    totalCourses,
    totalStudents,
    totalTeachers,
  });
};

export const getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

export const getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

export const getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};

export const getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};

// export const sendEmail = async (req, res) => {
//   const outputMessage = `

//   <h1>Mail Details </h1>
//   <ul>
//     <li>Name: ${req.body.name}</li>
//     <li>Email: ${req.body.email}</li>
//   </ul>
//   <h1>Message</h1>
//   <p>${req.body.message}</p>
//   `

//   let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: "example@gmail.com", // gmail account
//       pass: "password", // gmail password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Smart EDU Contact Form" <arinyazilim@gmail.com>', // sender address
//     to: "gcekic@gmail.com", // list of receivers
//     subject: "Smart EDU Contact Form New Message ✔", // Subject line
//     html: outputMessage, // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

//   res.status(200).redirect('contact');

// };
