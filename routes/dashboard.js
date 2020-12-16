var express = require("express");
var router = express.Router();
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

router.get("/settings/", async (req, res, next) => {
  try {
    const members = await UserModel.find().sort({ createdAt: -1 }).limit(5);
    res.render("settings", { members, title: "Settings" });
  } catch (err) {
    next(err);
  }
});

router.get("/register/:id", async (req, res, next) => {
  try {
    res.render(
      "register_company_edit",
      await CompanyModel.findById(req.params.id)
    );
  } catch (err) {
    next(err);
  }
});

router.post("/register", uploader.single("logo"), async (req, res, next) => {
  try {
    const companyToRegister = { ...req.body };
    if (req.file) companyToRegister.logo = req.file.path;
    await CompanyModel.create(req.body, companyToRegister);
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

router.post(
  "/register/:id",
  uploader.single("logo"),
  async (req, res, next) => {
    try {
      const companyToEdit = { ...req.body };
      if (req.file) companyToEdit.logo = req.file.path;
      await CompanyModel.findByIdAndUpdate(req.params.id, companyToEdit);
      res.redirect("/dashboard/settings");
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
