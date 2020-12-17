var express = require("express");
var router = express.Router();
const ClientModel = require("../models/Clients");
const UserModel = require("../models/User");
const TaskModel = require("../models/Task");
const CompanyModel = require("../models/Company");
const uploader = require("./../config/cloudinary");
const bcrypt = require("bcrypt");
const protectLogRoute = require("../middlewares/protectLogRoute");

// ACCOUNT MANAGEMENT

router.get("/", protectLogRoute, async (req, res, next) => {
  try {
    const clients = await ClientModel.find({
      creator: req.session.currentUser._id,
    })
      .populate("task")
      .slice("task", -1);
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

router.get("/search", protectLogRoute, async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(
      req.session.currentUser._id
    ).populate("company");
    const currentCompany = await CompanyModel.findById(currentUser.company._id);
    const exp = new RegExp(req.query.search);
    const matchedProspects = await ClientModel.find({
      creator: req.session.currentUser._id,
      $or: [
        { firstname: { $regex: exp } },
        { lastname: { $regex: exp } },
        { email: { $regex: exp } },
        { phonenumber: { $regex: exp } },
      ],
    });
    res.render("account_management_search", {
      currentCompany,
      currentUser,
      title: `Search results for ${req.query.search}`,
      matchedProspects,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/add", protectLogRoute, async (req, res, next) => {
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

router.post("/add", protectLogRoute, async (req, res, next) => {
  try {
    const newProspect = { ...req.body };
    newProspect.creator = await UserModel.findById(req.session.currentUser._id);
    await ClientModel.create(newProspect);
    res.redirect("/account-management");
  } catch (err) {
    next(err);
  }
});

router.get("/delete/:id", protectLogRoute, async (req, res, next) => {
  try {
    await ClientModel.findByIdAndDelete(req.params.id);
    res.redirect("/account-management");
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:id",
  protectLogRoute,
  uploader.single("files"),
  async (req, res, next) => {
    try {
      const currentUser = await UserModel.findById(
        req.session.currentUser._id
      ).populate("company");
      const client = await ClientModel.findById(req.params.id).populate("task");
      res.render("client_page", {
        currentUser,
        client,
        script: "client-page.js",
        title: `${client.firstname} ${client.lastname}`,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/edit/:id",
  protectLogRoute,
  uploader.single("files"),
  async (req, res, next) => {
    try {
      const upload = req.file.path;
      await ClientModel.findByIdAndUpdate(req.params.id, {
        $push: { files: `${upload}` },
      });
      res.redirect("/account-management/");
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
