"use strict";

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

var courseSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    maxStudents: {
      type: Number,
      default: 0,
      min: [0, "Course cannot have a negative cost"]
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Course", courseSchema);
