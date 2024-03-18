import express from "express";
import ejs from "ejs";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import methodOverride from "method-override";
import pageRoute from "./routes/pageRoute.js";
import courseRoute from "./routes/courseRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import usersRoute from "./routes/usersRoute.js";

const app = express();

// CONNECT DB
mongoose.connect("mongodb://127.0.0.1:27017/smartedu-db").then(() => {
  console.log("DB CONNECTED SUCCESFULLY");
});

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// GLOBAL VARIABLE
global.userIN = null;

// MIDDLEWARE
app.use(express.static("public"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: "my-session-key",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/smartedu-db",
    }),
  })
);
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

// ROUTING
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", usersRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at port ${port}...`);
});
