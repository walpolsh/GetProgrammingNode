const MongoDB = require("mongodb").MongoClient;
const dbURL = "mongodb://localhost:27017";
const dbName = "TestDB";

MongoDB.connect(dbURL, (err, client) => {
  if (err) throw err;
  let db = client.db(dbName);
  db.collection("contacts")
    .find()
    .toArray((err, data) => {
      if (err) throw err;
      console.log(data);
    });
  db.collection("contacts").insert(
    {
      name: "Henry Wynberg",
      reps: "9000"
    },
    (err, db) => {
      if (err) throw err;
      console.log(db);
    }
  );
});

// ask the database to find all records in the contacts collection and return them in an array.
// The resulting data is returned in the callback function.
// Then you can log the results to the console.
