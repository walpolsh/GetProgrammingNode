const MongoDB = require("mongodb").MongoClient;
const Subscriber = require("./models/subscribers");
const mongoose = require("mongoose");
const dbURL = "mongodb://localhost:27017";
const dbName = "TestDB";
const user1 = {
  name: "Paul Walsh",
  email: "paul@paulcom.com"
};
const user2 = {
  name: "Henry Wynberg",
  reps: "9000"
};

//• 1 Run a query with a callback function to handle errors and data.
const findOneWhere = (user, key, valExp) =>
  Subscriber.findOne(user).where(key, valExp);

const testQuery1 = findOneWhere(user1, "email", /paul/);
const testQuery2 = findOneWhere(user2, "name", /henry/);

const dataName = (err, data) => {
  if (err) throw err;
  if (data) console.log(data.name);
};

testQuery1.exec(dataName);
testQuery2.exec(dataName);
// You can instantiate new objects from this model by referring to Subscriber.

mongoose.connect("mongodb://localhost:27017/" + dbName, {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.once("open", () =>
  console.log(`--- Successfully connected to MongoDB ${dbName} ${dbURL}`)
);
MongoDB.connect(dbURL, (err, client) => {
  if (err) throw err;
  let db = client.db(dbName);
  db.collection("contacts")
    .find()
    .toArray((err, data) => {
      if (err) throw err;
      console.log(data);
    });
});
const subscriber1 = new Subscriber(user1); //• 1 Instantiate a new subscriber.
//To get this newly created Subscriber object into the database;
//you can call save on it and handle any errors or returned data through a callback function.
subscriber1.save((err, savedDocument) => {
  //• 2 Save a subscriber to the database.
  if (err) console.log(err); //• 3 Pass potential errors to the next middleware function.
  console.log(savedDocument); //• 4 Log saved data document.
});

Subscriber.create(user1, (err, savedDocument) => {
  if (err) console.log(err);
  console.log(savedDocument); //• 5 Create and save a subscriber in a single step.
});
