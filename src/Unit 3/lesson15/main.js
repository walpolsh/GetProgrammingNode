const express = require("express");
const app = express();
const subscribersController = require("./controllers/subscribersController");
const mongoose = require("mongoose");
const dbURL = "mongodb://localhost:27017";
const dbName = "TestDB";
const encoded = express.urlencoded({
  extended: false
});
app.use(encoded);

app.get(
  "/subscribers",
  subscribersController.getAllSubscribers,
  (req, res, next) => res.send(req.data)
);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/" + dbName, {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.once("open", () =>
  console.log(`--- Successfully connected to MongoDB ${dbName} ${dbURL}`)
);

app.listen(4000);
console.log("express is running on 4000");
