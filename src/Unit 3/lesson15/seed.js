const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

// • 1 Set up the connection to the database.
mongoose.connect("mongodb://localhost:27017/TestDB2", {
  useNewUrlParser: true
});
mongoose.connection;

let contacts = [
  { name: "Paul Walsh", email: "paul@walsh.tech", zipCode: 12345 },
  { name: "Henry Wynberg", email: "Henry@Wynberg.tech", zipCode: 12345 },
  { name: "Jenny Chung", email: "Jenny@Chung.biz", zipCode: 12345 }
];

Subscriber.deleteMany()
  // • 2 Remove all existing data.
  .exec()
  .then(() => {
    console.log("Subscriber data is empty!");
  });

let commands = [];

// • 3 Loop through subscriber objects to create promises.
contacts.forEach(c => {
  commands.push(
    Subscriber.create({
      name: c.name,
      email: c.email,
      zipCode: c.zipCode
    })
  );
});

// • 4 Log confirmation after promises resolve.
Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  });

//You can run this file by entering node seed.js
