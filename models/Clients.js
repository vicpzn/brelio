const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    phonenumber: String,
    company: String,
    streetnumber: String,
    street: String,
    zipcode: String,
    city: String,
    country: String,
    task_associated: [String],
    task_deadline: Date,
    priority: Number,
    comments: [String],
  },
  { timestamps: true }
);

const ClientModel = mongoose.model("client", clientSchema);

module.exports = ClientModel;