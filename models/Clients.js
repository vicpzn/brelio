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
    task_deadline: { type: Date, default: Date.now },
    priority: {
      type: Number,
      default: 1,
    },
    comments: [String],
  },
  { timestamps: true }
);

const ClientModel = mongoose.model("client", clientSchema);

module.exports = ClientModel;
