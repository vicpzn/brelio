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
    task: [{ type: Schema.Types.ObjectId, ref: "task" }],
    comments: [String],
    creator: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const ClientModel = mongoose.model("client", clientSchema);

module.exports = ClientModel;
