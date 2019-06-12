// Notice the use of object destructuring for the Mongoose Schema object.
// {Schema} assigns the Schema object in mongoose to a constant by the same name. Later, you’ll apply this new format to other models.
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Subscriber = require("./subscriber");
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
// //The pre("save") hook is Mongoose middleware, and as with other middleware,
//  when the function completes, it moves on to the next middleware function.
// next here indicates the next function in the middleware chain to be called.
userSchema.pre("save", function(next) {
  let user = this;
  if (user.subscribedAccount === undefined) {
    Subscriber.findOne({
      email: user.email
    })
      .then(subscriber => {
        user.subscribedAccount = subscriber;
      })
      .catch(err => {
        console.log(`Error in connecting subscriber: ${err.message}`);
      });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
