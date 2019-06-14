"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  Subscriber = require("./subscriber");
const bcrypt = require("bcrypt");
var userSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        trim: true
      },
      last: {
        type: String,
        trim: true
      }
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    zipCode: {
      type: Number,
      min: [10000, "Zip code too short"],
      max: 99999
    },
    password: {
      type: String,
      required: true
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course"
      }
    ],
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
  bcrypt
    .hash(user.password, 10)
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(err => {
      console.log(`Error in hashing password: ${err.message}`);
      next(err);
    });
});
userSchema.methods.passwordComparison = function(inputPassword) {
  let user = this;
  return bcrypt.compare(inputPassword, user.password);
};

module.exports = mongoose.model("User", userSchema);
