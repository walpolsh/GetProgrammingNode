const mongoose = require("mongoose");
const subscriberSchema = mongoose.Schema({
  name: String,
  email: String,
  reps: Number,
  postalCode: String
});

module.exports = mongoose.model("Subscriber", subscriberSchema);
