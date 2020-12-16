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
    task_associated: [{ type: Schema.Types.ObjectId, ref: "task_associated" }],
    task_deadline: [{ type: Schema.Types.ObjectId, ref: "task_deadline" }],
    priority: [{ type: Schema.Types.ObjectId, ref: "priority" }],
    comments: [String],
  },
  { timestamps: true }
);

const ClientModel = mongoose.model("client", clientSchema);

module.exports = ClientModel;
