import express from "express";
import ejs from "ejs";

import pageRouter from "./routes/pageRouter.js";

const app = express();

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARE
app.use(express.static("public"));

// ROUTING
app.use("/", pageRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor`);
});
