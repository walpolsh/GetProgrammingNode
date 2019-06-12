// const mongoose = require("mongoose"); //Require Mongoose in REPL.
// const Subscriber = require("./models/subscriber"); //Assign the Subscriber model to a variable, using the model name and local project file.

// mongoose.connect("mongodb://localhost:27017/recipe_db", {
//   //Set up a database connection, using recipe_db.
//   useNewUrlParser: true
// });
// // Tell Mongoose to use native promises as you did in main.js.
// mongoose.Promise = global.Promise;

// //Create a new subscriber document.
// Subscriber.create({
//   name: "sdfsfqw",
//   email: "asdfsexgtg@us.com",
//   zipCode: "12345"
// })
//   .then(subscriber => console.log(subscriber))
//   .catch(error => console.log(error.message));
// var subscriber; //Set up a variable to hold query results.
// Subscriber.findOne({
//   //Search for the document you just created.
//   name: "Paul"
// }).then(result => {
//   subscriber = result;
//   console.log(subscriber.getInfo()); // Log the subscriber record.
// });

// /*

// To start interacting with your database by using the Subscriber model,
// you need to go into REPL by typing the node keyword in a new terminal window and adding the lines in listing 17.4.
// Set up the environment by requiring Mongoose.
// (You need to be in your project’s directory in terminal for this procedure to work.)
// Next, set up the connection to MongoDB. Enter the name of your database—in this case, recipe_db.

//  */
// const Course = require("./models/course");
// var testCourse, testSubscriber;
// Course.create({
//   title: "Tomato Land",
//   description: "Locally farmed tomatoes only",
//   zipCode: 12345,
//   items: ["cherry", "heirloom"]
// }).then(course => (testCourse = course));
// Subscriber.findOne({}).then(subscriber => (testSubscriber = subscriber));
// testSubscriber.courses.push(testCourse);
// testSubscriber.save();
// Subscriber.populate(testSubscriber, "courses").then(subscriber =>
//   console.log(subscriber)
// );

const mongoose = require("mongoose"),
  Subscriber = require("./models/subscribers"),
  Course = require("./models/course");
var testCourse, testSubscriber;
mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
Subscriber.remove({}) //Remove all subscribers and courses.
  .then(items => console.log(`Removed ${items.n} records!`))
  .then(() => {
    return Course.remove({});
  })
  .then(items => console.log(`Removed ${items.n} records!`))
  .then(() => {
    return Subscriber.create({
      name: "Jon",
      email: "jon@jonwexler.com",
      zipCode: "12345"
    });
  })
  .then(subscriber => {
    console.log(`Created Subscriber: ${subscriber.getInfo()}`);
  })
  .then(() => {
    return Subscriber.findOne({
      name: "Jon"
    });
  })
  .then(subscriber => {
    testSubscriber = subscriber;
    console.log(`Found one subscriber: ${subscriber.getInfo()}`);
  })
  .then(() => {
    return Course.create({
      title: "Tomato Land",
      description: "Locally farmed tomatoes only",
      zipCode: 12345,
      items: ["cherry", "heirloom"]
    });
  })
  .then(course => {
    testCourse = course;
    console.log(`Created course: ${course.title}`);
  })
  .then(() => {
    testSubscriber.courses.push(testCourse);
    testSubscriber.save();
  })
  .then(() => {
    return Subscriber.populate(testSubscriber, "courses");
  })
  .then(subscriber => console.log(subscriber))
  .then(() => {
    return Subscriber.find({
      courses: mongoose.Types.ObjectId(testCourse._id)
    });
  })
  .then(subscriber => console.log(subscriber));
