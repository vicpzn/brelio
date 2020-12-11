const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    password: Number,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
