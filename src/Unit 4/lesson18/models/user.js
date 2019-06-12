// Notice the use of object destructuring for the Mongoose Schema object.
// {Schema} assigns the Schema object in mongoose to a constant by the same name. Later, you’ll apply this new format to other models.
const mongoose = require("mongoose");
const { Schema } = mongoose;
//Create the user schema.
const userSchema = new Schema(
  //Add first and last name properties
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
    //Add a password property.
    password: {
      type: String,
      required: true
    },
    zipCode: {
      type: Number,
      min: [1000, "Zip code too short"],
      max: 99999
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }], //Add a courses property to connect users to courses.
    subscribedAccount: { type: Schema.Types.ObjectId, ref: "Subscriber" } //Add a subscribedAccount to connect users to subscribers.
  },
  {
    timestamps: true //Add a timestamps property to record createdAt and updatedAt dates.
  }
);

userSchema
  .virtual("fullName") //Add a virtual attribute to get the user’s full name.
  .get(function() {
    return `${this.name.first} ${this.name.last}`;
  });

module.exports = mongoose.model("User", userSchema);
