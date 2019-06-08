const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const layouts = require("express-ejs-layouts");

app.use(express.static("public"));
//Tell the Express.js app to use body-parser for processing URL-encoded and JSON parameters.
//Now my application is ready to analyze data within incoming requests.
app.use(
  express.urlencoded({
    extended: false
  })
);
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(layouts);
app.get("/", homeController.showIndex);

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);
//The order of routes matters. These routes must go below any preexisting routes, as they act as a catch-all and override any routes below them.
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log("the server is running on " + app.get("port"));
});
