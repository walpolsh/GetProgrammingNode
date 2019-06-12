const mongoose = require("mongoose");

//The 'unique' option used on the email property isn’t a validator, but rather a Mongoose schema helper.
// instance methods operate on an instance (a Mongoose document) of
// the Subscriber model and are defined by subscriberSchema.methods.
const subscriberSchema = mongoose.Schema({
  name: { type: String, required: true }, //require name property
  email: { type: String, required: true, lowercase: true, unique: true }, //require email property and add lowercase property
  reps: Number,
  zipCode: { type: String, min: [10000, "Zip code too short"], max: 99999 },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
});

// • String—This type, like Boolean and Number, is straightforward.
// Specifying a schema property of type String means that this property will save data presented as a JavaScript String (not null or undefined).
// • Date—Dates are useful in data documents, as they can tell you when data was saved or modified, or when anything involving that model occurred.
// This type accepts a JavaScript Date object.
// • Array—The Array type allows a property to store a list of items.
//  When specifying the Array type, use the array literal, enclosing square brackets [] instead of its name.
// • Mixed—This type is most similar to a JavaScript object, as it stores key-value pairs on a model.
// To use the Mixed type, you need to specify mongoose.Schema.Types.Mixed.
// • ObjectId—Like the ObjectId value for each document in your MongoDB database, this type references that object.
// This type is particularly important when associating models with one another.
// To use this type, specify mongoose.Schema.Types.ObjectId.

//Add an instance method to get the full name of a subscriber.
subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Email: ${this.email} Zip Code ${this.zipCode}`;
};
//Add an instance method to find subscribers with the same ZIP code.
subscriberSchema.methods.findLocalSubscribers = function() {
  //Access the Subscriber model to use the find method
  return this.model("Subscriber")
    .find({ zipCode: this.zipCode })
    .exec();
};

module.exports = mongoose.model("Subscriber", subscriberSchema);
