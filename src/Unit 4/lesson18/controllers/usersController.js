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
  }
};
