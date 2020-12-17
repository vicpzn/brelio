const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    name: { type: String, default: "Company" },
    streetnumber: String,
    street: String,
    zipcode: String,
    city: String,
    country: String,
    phonenumber: String,
    logo: { type: String, default: "/media/images/default_logo.png" },
  },
  { timestamps: true }
);

const CompanyModel = mongoose.model("company", companySchema);

module.exports = CompanyModel;
