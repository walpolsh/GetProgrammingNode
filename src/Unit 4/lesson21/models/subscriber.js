"use strict";

const mongoose = require("mongoose"); // Require mongoose.
const { Schema } = require("mongoose");
var subscriberSchema = mongoose.Schema(
  //Add schema properties.
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    zipCode: {
      type: Number,
      min: [10000, "zip code is too short"],
      max: 99999
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }] //Associate multiple courses.
  },
  {
    timestamps: true
  }
);

subscriberSchema.method.getInfo = function() {
  //Add a getInfo instance method.
  return `Name: ${this.name} Email:${this.email}`;
};

module.exports = mongoose.model("Subscriber", subscriberSchema); //Export the Subscriber model.
