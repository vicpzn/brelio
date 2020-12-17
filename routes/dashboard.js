var express = require("express");
var router = express.Router();
const CompanyModel = require("../models/Company");
const UserModel = require("../models/User");
const ClientModel = require("../models/Clients");
const TaskModel = require("../models/Task");
const uploader = require("./../config/cloudinary");
const bcrypt = require("bcrypt");
const protectAdminRoute = require("../middlewares/protectAdminRoute");
const protectAdminManagerRoute = require("../middlewares/protectAdminManagerRoute");
const protectLogRoute = require("../middlewares/protectLogRoute");

// ROUTER DASHBOARD

router.get("/", protectLogRoute, async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(
      req.session.currentUser._id
    ).populate("company");
    const lastTasks = await ClientModel.find({
      creator: req.session.currentUser._id,
    }).populate("task");
    const lastProspects = await ClientModel.find({
      creator: req.session.currentUser._id,
    })
      .sort({ task_deadline: -1 })
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

router.get("/register", protectLogRoute, (req, res) => {
  res.render("register_company", { title: "Register your company" });
});

router.get("/settings/", protectAdminManagerRoute, async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(
      req.session.currentUser._id
    ).populate("company");
    const membersTeam = await UserModel.find({
      company: currentUser.company,
    })
      .sort({ createdAt: -1 })
      .limit(5);
    res.render("settings", {
      currentUser,
      membersTeam,
      title: "Settings",
    });
  } catch (err) {
    next(err);
  }
});

router.get(
  "/register/:id",
  protectAdminManagerRoute,
  async (req, res, next) => {
    try {
      const company = await CompanyModel.findById(req.params.id);
      res.render("register_company_edit", {
        company,
        title: "Edit your company",
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/register",
  protectLogRoute,
  uploader.single("logo"),
  async (req, res, next) => {
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
  }
);

router.post(
  "/register/:id",
  protectLogRoute,
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
