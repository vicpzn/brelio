var express = require("express");
const UserModel = require("../models/User");
var router = express.Router();
const ClientModel = require("../models/Clients");
const CompanyModel = require("../models/Company");
const uploader = require("./../config/cloudinary");
const bcrypt = require("bcrypt");

// ROUTER DASHBOARD

router.get("/", (req, res) => {
  res.render("dashboard", { title: "Dashboard" });
});

// REGISTER A COMPANY

router.get("/register", (req, res) => {
  res.render("register_company");
});

router.post("/register", async (req, res, next) => {
  try {
    await CompanyModel.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

router.get("/settings/", async (req, res, next) => {
  try {
    const members = await UserModel.find().sort({ createdAt: -1 }).limit(5);
    res.render("settings", { members, title: "Settings" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
