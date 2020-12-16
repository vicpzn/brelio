var express = require("express");
var router = express.Router();
const ClientModel = require("../models/Clients");
const uploader = require("./../config/cloudinary");
const bcrypt = require("bcrypt");

// ACCOUNT MANAGEMENT

router.get("/", async (req, res, next) => {
  try {
    const clients = await ClientModel.find();
    res.render("account_management", {
      title: "Account Management",
      clients,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/add", (req, res) => {
  res.render("new_account", { title: "Add a new prospect" });
});

router.post("/add", async (req, res, next) => {
  try {
    await ClientModel.create(req.body);
    res.redirect("/account-management");
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let client = await ClientModel.findById(req.params.id);
    res.render("client_page", {
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
