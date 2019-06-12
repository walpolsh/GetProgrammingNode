"use strict";

const mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  items: [],
  zipCode: {
    type: Number,
    min: [1000, "Zip code too short"],
    max: 99999
  }
});

module.exports = mongoose.model("Course", courseSchema);
