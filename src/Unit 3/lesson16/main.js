const express = require("express");
const layouts = require("express-ejs-layouts");
const app = express();
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
//• 1 Require mongoose.
const mongoose = require("mongoose");
//• 2 Set up the database connection.
mongoose.connect("mongodb://localhost:27017/TestDB3", {
  useNewUrlParser: true
});

app.set("port", port);
app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//routes
app.get("/", homeController.showHome);
app.get("/courses", homeController.showCourses);
app.get("/contact", subscribersController.getSubscriptionPage); //route to view the contact page.
app.get("/subscribers", subscribersController.getAllSubscribers); //route to view all subscribers
app.post("/subscribe", subscribersController.saveSubscriber); //route to handle posted form data.

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
