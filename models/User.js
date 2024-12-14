const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//database schema or design of user
const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    //sets minimum length of password as 6 characters
    minlength: 6,
    select: true,
  },
  confirmationCode: {
    type: String
  },
  isConfirmed: {
    type: Boolean,
    default: false
  },
});

//securing the passwords by hashing them using bcryptjs library
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
