const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    name: { type: String, default: "company" },
    streetnumber: String,
    street: String,
    zipcode: String,
    city: String,
    country: String,
    phonenumber: String,
    firstname: { type: String, default: "john" },
    lastname: { type: String, default: "doe" },
    users_id: [String], // team members ids added by the manager
    logo: { type: String, default: "/media/images/default_logo.png" },
  },
  { timestamps: true }
);

const CompanyModel = mongoose.model("company", companySchema);

module.exports = CompanyModel;
