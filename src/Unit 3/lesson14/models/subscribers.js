const mongoose = require("mongoose");
const testSchema = mongoose.Schema({
  name: String,
  email: String,
  reps: Number,
  postalCode: String
});

module.exports = mongoose.model("Subscriber", testSchema);
