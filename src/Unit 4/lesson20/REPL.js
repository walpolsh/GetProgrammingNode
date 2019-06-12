// SETUP
const User = require("./models/user");
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const Course = require("./models/course");

var testCourse, testSubscriber;

mongoose.connect("mongodb://localhost/recipe_db");
mongoose.Promise = global.Promise;

let testUser;
User.create({
  name: {
    first: "dude",
    last: "Reaper"
  },
  email: "Metal@dude.com",
  password: "storedinplaintextbad",
  zipCode: 15379
})
  .then(function(user) {
    testUser = user;
    return Subscriber.findOne({
      email: user.email
    });
  })
  .then(subscriber => {
    testUser.subscribedAccount = subscriber;
    testUser.save().then(user => console.log(`user ${user} updated`));
  })
  .catch(err => console.log(err.message));

// PROMISE CHAIN

// REMOVE ALL SUBSCRIBERS
Subscriber.remove({})
  .then(items => console.log(`Removed ${items.n} records!`))

  // REMOVE ALL COURSES
  .then(() => {
    return Course.remove({});
  })
  .then(items => console.log(`Removed ${items.n} records!`))

  // CREATE A SUBSCRIBER
  .then(() => {
    return Subscriber.create({
      name: "Paul",
      email: "Paul@PaulWalsh.com",
      zipCode: "12345"
    });
  })
  .then(subscriber => {
    console.log(`Created Subscriber: ${subscriber.getInfo()}`);
  })

  // FIND A SUBSCRIBER
  .then(() =>
    Subscriber.findOne({
      name: "Paul"
    })
  )

  // SAVE SUBSCRIBER AS testSubscriber
  .then(subscriber => {
    testSubscriber = subscriber;
    console.log(`Found one subscriber: ${subscriber.getInfo()}`);
  })

  // CREATE A COURSE
  .then(() =>
    Course.create({
      title: "Learn to Rep",
      description: "Hot and wet since 2019",
      zipCode: 12345,
      items: ["React", "Flask"]
    })
  )
  // SAVE COURSE AS testCourse
  .then(course => {
    testCourse = course;
    console.log(`Created course: ${course.title}`);
  })

  // ASSOCIATE SUBSCRIBER WITH COURSE AND SAVE
  .then(() => {
    testSubscriber.courses.push(testCourse);
    testSubscriber.save();
  })

  // POPULATE SUBSCRIBER DOCUMENT WITH COURSE DATA AND LOG
  .then(() => Subscriber.populate(testSubscriber, "courses"))
  .then(subscriber => console.log(subscriber))
  .then(() =>
    Subscriber.find({ courses: mongoose.Types.ObjectId(testCourse._id) })
  )
  .then(subscriber => console.log(subscriber))
  .catch(error => console.log(error.message));
