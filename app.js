import express from "express";
import ejs from "ejs";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import pageRoute from "./routes/pageRoute.js";
import courseRoute from "./routes/courseRoute.js";

const app = express();

// CONNECT DB
mongoose.connect("mongodb://127.0.0.1:27017/smartedu-db").then(() => {
  console.log("DB CONNECTED SUCCESFULLY");
});

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARE
app.use(express.static("public"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// ROUTING
app.use("/", pageRoute);
app.use("/courses", courseRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at port ${port}...`);
});
