const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["admin", "manager", "user"],
      default: "manager",
    },
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    phonenumber: String,
    company: String,
    avatar: {
      type: String,
      default: "/media/images/default-profile.png",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
