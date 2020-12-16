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
    const currentUser = await UserModel.findById("5fd77c662cb143287e9b194d");
    const currentCompany = await CompanyModel.find({
      _id: currentUser.company,
    });
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
      currentCompany,
      title: "Dashboard",
    });
  } catch (err) {
    next(err);
  }
});

// REGISTER A COMPANY

router.get("/register", (req, res) => {
  res.render("register_company", { title: "New company" });
});

router.get("/settings/", async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById("5fd77c662cb143287e9b194d");
    const membersTeam = await UserModel.find({
      company: currentUser.company,
    })
      .sort({ createdAt: -1 })
      .limit(5);
    const currentCompany = await CompanyModel.find({
      _id: currentUser.company,
    });
    res.render("settings", {
      currentCompany,
      currentUser,
      membersTeam,
      title: "Settings",
    });
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
    if (req.file) companyToRegister.logo = req.file.path;
    await CompanyModel.create(companyToRegister);
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
