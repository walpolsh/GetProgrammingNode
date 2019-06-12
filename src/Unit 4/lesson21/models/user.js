"use strict";

const mongoose = require("mongoose");
const Subscriber = require("./subscriber");
const { Schema } = require("mongoose");

var userSchema = mongoose.Schema(
  {
    name: {
      first: { type: String, trim: true },
      second: { type: String, trim: true }
    },
    email: { type: String, required: true, lowercase: true, unique: true },
    zipCode: {
      type: Number,
      min: [10000, "zip code is too short"],
      max: 99999
    },
    password: {
      type: String,
      required: true
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    subscribedAccount: {
      type: Schema.Types.ObjectId,
      ref: "Subscriber"
    }
  },
  {
    timestamps: true
  }
);

userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
});

userSchema.pre("save", function(next) {
  let user = this;
  if (user.subscribedAccount === undefined) {
    Subscriber.findOne({
      email: user.email
    })
      .then(subscriber => {
        user.subscribedAccount = subscriber;
        next();
      })
      .catch(err => {
        console.log(`Error in connecting subscriber: ${err.message}`);
        next(err);
      });
  } else {
    next();
  }
});
module.exports = mongoose.model("User", userSchema);
