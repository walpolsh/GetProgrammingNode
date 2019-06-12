const User = require("../models/user"); //Require the user model.

// Render the index page with an array of users.
module.exports = {
  index: (req, res, next) => {
    // Run query in index action only.
    User.find()
      .then(users => {
        res.locals.users = users; // Store the user data on the response and call the next middleware function.
        next();
      })
      .catch(err => {
        // Catch errors, and pass to the next middleware.
        // Log error messages and redirect to the home page.
        console.log(`error redirecting users: ${err.message}`);
        next(err);
      });
  },
  indexView: (req, res) => {
    res.render("users/index"); // Render view in separate action.
  },
  new: (req, res) => {
    res.render("users/new");
  },
  create: (req, res, next) => {
    let userParams = {
      name: {
        first: req.body.first,
        last: req.body.last
      },
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode
    };
    User.create(userParams)
      .then(user => {
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch(err => {
        console.log(`error saving user: ${err.message}`);
        next(err);
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let userId = req.params.id; //Collect the user ID from the request params.
    User.findById(userId) // Find a user by its ID.
      .then(user => {
        res.locals.user = user;
        // Pass the user through the response object to the next middleware function.
        next();
      })
      .catch(err => {
        // Log and pass errors to next function.
        console.log(`Error has occoured fetching user by ID ${err.message}`);
        next(error);
      });
  },
  showView: (req, res) => {
    // Render show view.
    res.render("users/show");
  }
};
