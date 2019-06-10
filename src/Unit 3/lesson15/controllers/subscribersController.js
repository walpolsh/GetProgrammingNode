const mongoose = require("mongoose");
const Subscriber = require("../models/subscriber");

exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
};
exports.getAllSubscribers = (req, res, next) => {
  //a request is made to view all subscribers in your database
  Subscriber.find({})
    .exec()
    //By using the exec call following find, you’re invoking your query to return a promise.
    // //Without using exec, you’re still able to use then and catch to handle follow-up commands.
    // Without exec, however, you won’t have an authentic promise—only Mongoose’s version of a promise query.
    // Some Mongoose methods, however, such as save, return a promise and won’t work with exec.
    // You can read more about the distinctions at http://mongoosejs.com/docs/promises.html.
    .then(subscribers => {
      res.render("subscribers", {
        subscribers: subscribers
      });
    })
    .catch(err => {
      console.log(err.message);
      return [];
    })
    .then(() => console.log("promise complete " + subscribers));
};

exports.saveSubscriber = (req, res) => {
  console.log(req.body);
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode
  });
  newSubscriber.save((err, result) => {
    if (err) res.send(err);
    res.render("thanks");
  });
};
