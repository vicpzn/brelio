var express = require("express");
var router = express.Router();
const ClientModel = require("../models/Clients");
const UserModel = require("../models/User");
const TaskModel = require("../models/Task");
const CompanyModel = require("../models/Company");
const uploader = require("./../config/cloudinary");
const bcrypt = require("bcrypt");

// ACCOUNT MANAGEMENT

router.get("/", async (req, res, next) => {
  try {
    const clients = await ClientModel.find();
    const currentUser = await UserModel.findById(
      req.session.currentUser._id
    ).populate("company");
    const currentCompany = await CompanyModel.findById(currentUser.company._id);
    res.render("account_management", {
      title: "Account Management",
      clients,
      currentCompany,
      currentUser,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/add", async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(
      req.session.currentUser._id
    ).populate("company");
    const currentCompany = await CompanyModel.findById(currentUser.company._id);
    res.render("new_account", {
      currentCompany,
      currentUser,
      title: "Add a new prospect",
    });
  } catch (err) {
    next(err);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const newProspect = { ...req.body };
    newProspect.creator = await UserModel.findById(req.session.currentUser._id);
    await ClientModel.create(newProspect);
    res.redirect("/account-management");
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(
      req.session.currentUser._id
    ).populate("company");
    let client = await ClientModel.findById(req.params.id).populate("task");
    res.render("client_page", {
      currentUser,
      client,
      script: "client-page.js",
      title: `${client.firstname} ${client.lastname}`,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/delete/:id", async (req, res, next) => {
  try {
    await ClientModel.findByIdAndDelete(req.params.id);
    res.redirect("/account-management");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
