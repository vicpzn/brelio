var express = require("express");
var router = express.Router();
const CompanyModel = require("../models/Company");
const UserModel = require("../models/User");
const ClientModel = require("../models/Clients");
const TaskModel = require("../models/Task");
const uploader = require("./../config/cloudinary");
const bcrypt = require("bcrypt");

// ROUTER DASHBOARD

router.get("/", async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(
      req.session.currentUser._id
    ).populate("company");
    const lastTasks = await TaskModel.find()
      .sort({ task_deadline: -1 })
      .limit(5);
    const lastProspects = await ClientModel.find()
      .sort({ createdAt: -1 })
      .limit(5);
    res.render("dashboard", {
      lastTasks,
      lastProspects,
      currentUser,
      title: "Dashboard",
    });
  } catch (err) {
    next(err);
  }
});

// REGISTER A COMPANY

router.get("/register", (req, res) => {
  res.render("register_company", { title: "Register your company" });
});

router.get("/settings/", async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(
      req.session.currentUser._id
    ).populate("company");
    const membersTeam = await UserModel.find({
      company: currentUser.company,
    })
      .sort({ createdAt: -1 })
      .limit(5);
    if (currentUser.role === "admin" || currentUser.role === "manager") {
      res.render("settings", {
        currentUser,
        membersTeam,
        title: "Settings",
      });
    } else {
      res.send("You don't have access to this page.");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/settings/admin", async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(
      req.session.currentUser._id
    ).populate("company");
    const companies = await CompanyModel.find()
      .sort({ createdAt: -1 })
      .limit(5);
    if (currentUser.role === "admin") {
      res.render("settings_admin", {
        currentUser,
        companies,
        title: "Admin Settings",
      });
    } else {
      res.send("You don't have access to this page.");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/register/:id", async (req, res, next) => {
  try {
    const company = await CompanyModel.findById(req.params.id);
    res.render("register_company_edit", {
      company,
      title: "Edit your company",
    });
  } catch (err) {
    next(err);
  }
});

router.post("/register", uploader.single("logo"), async (req, res, next) => {
  try {
    const companyToRegister = { ...req.body };
    companyToRegister.creator = await UserModel.findById(
      req.session.currentUser._id
    );
    if (req.file) companyToRegister.logo = req.file.path;
    await CompanyModel.create(companyToRegister);
    if (!req.session.currentUser.company) {
      const idCompany = await CompanyModel.find({
        creator: req.session.currentUser._id,
      });
      await UserModel.findByIdAndUpdate(req.session.currentUser._id, {
        company: idCompany[0]._id,
      });
    }
    res.redirect("/dashboard/settings");
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
