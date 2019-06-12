"use strict";

const express = require("express"),
  layouts = require("express-ejs-layouts"),
  app = express(),
  router = express.Router(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  subscribersController = require("./controllers/subscribersController"),
  coursesController = require("./controllers/coursesController"),
  usersController = require("./controllers/usersController"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  expressSession = require("express-session");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/recipe_db");
const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(layouts);

router.use(cookieParser("secret_passcode"));
router.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);
router.use(connectFlash());

router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

router.use(express.static("public"));

router.use(
  bodyParser.urlencoded({
    extended: false
  })
);
router.use(bodyParser.json());

router.get("/", homeController.index);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post(
  "/users/create",
  usersController.create,
  usersController.redirectView
);
//Why does the placement of the /users/login route matter in main.js?
// Because you have routes that handle parameters in the URL, if those routes (such as /users/:id)
// come first, Express.js will treat a request to /users/login as a request to the user’s show page,
//  where login is the :id. Order matters: if the /users/login route comes first,
// Express.js will match that route before checking the routes that handle parameters.
router.get("/users/login", usersController.login);
router.post(
  "/users/login",
  usersController.authenticate,
  usersController.redirectView
);

router.get("/users/:id/edit", usersController.edit);
router.put(
  "/users/:id/update",
  usersController.update,
  usersController.redirectView
);
router.get("/users/:id", usersController.show, usersController.showView);
router.delete(
  "/users/:id/delete",
  usersController.delete,
  usersController.redirectView
);

router.get(
  "/subscribers",
  subscribersController.index,
  subscribersController.indexView
);
router.get("/subscribers/new", subscribersController.new);
router.post(
  "/subscribers/create",
  subscribersController.create,
  subscribersController.redirectView
);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put(
  "/subscribers/:id/update",
  subscribersController.update,
  subscribersController.redirectView
);
router.get(
  "/subscribers/:id",
  subscribersController.show,
  subscribersController.showView
);
router.delete(
  "/subscribers/:id/delete",
  subscribersController.delete,
  subscribersController.redirectView
);
router.get("/contact", subscribersController.new);

router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post(
  "/courses/create",
  coursesController.create,
  coursesController.redirectView
);
router.get("/courses/:id/edit", coursesController.edit);
router.put(
  "/courses/:id/update",
  coursesController.update,
  coursesController.redirectView
);
router.get("/courses/:id", coursesController.show, coursesController.showView);
router.delete(
  "/courses/:id/delete",
  coursesController.delete,
  coursesController.redirectView
);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
