const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  bio: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
}, {timestamps: true}
);


//pre-save middleware foer the "save" event on the user schema
// it will run before saving a user instance to the database
userSchema.pre("save", async function (next) {

  // check if the password field has been modified, if not move on the next middleware
  if (!this.isModified("password")) return next();

  // If the password has been modified, hash the password using bcrypt with a cost factor of 12.
  this.password = await bcrypt.hash(this.password, 12);

  // continue with the save operation
  return next();
});


// method to generate token
userSchema.methods = {
  jwtToken() {
    return jwt.sign(
      { 
        id: this._id, 
        email: this.username,
        username: this.username 
      },
      process.env.SECRET,
      {
        expiresIn: "24d",
      }
    );
  },
};


const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
