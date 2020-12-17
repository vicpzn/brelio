var express = require("express");
const UserModel = require("../models/User");
const CompanyModel = require("../models/Company");
var router = express.Router();
const uploader = require("./../config/cloudinary");
const bcrypt = require("bcrypt");
const protectAdminRoute = require("../middlewares/protectAdminRoute");

router.get("/all", async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(
      req.session.currentUser._id
    ).populate("company");
    const users = await UserModel.find({
      company: currentUser.company,
    })
      .sort({ createdAt: -1 })
      .limit(5);
    res.render("list_users", { users, title: "List of users" });
  } catch (err) {
    next(err);
  }
});

router.get("/admin/all", protectAdminRoute, async (req, res, next) => {
  try {
    const users = await UserModel.find().sort({ createdAt: -1 });
    res.render("list_users", { users, title: "List of users" });
  } catch (err) {
    next(err);
  }
});

router.get("/create", async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(
      req.session.currentUser._id
    ).populate("company");
    const currentCompany = await CompanyModel.find({
      _id: currentUser.company,
    });
    res.render("create_user", { currentCompany, title: "Create a new user" });
  } catch (err) {
    next(err);
  }
});

router.post("/create", uploader.single("avatar"), async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await UserModel.findOne({ email: newUser.email });
    if (req.file) newUser.avatar = req.file.path;
    if (foundUser) {
      req.flash(
        "warning",
        "Email already registered. Please try with another address."
      );
      res.redirect("/users/create");
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      await UserModel.create(newUser);
      req.flash("success", "Successfully registered.");
      res.redirect("/users/all");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/edit/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const currentUser = await UserModel.findById(
      req.session.currentUser._id
    ).populate("company");
    res.render("edit_user", { title: "Edit your profile", user, currentUser });
  } catch (err) {
    next(err);
  }
});

router.get("/delete/:id", async (req, res, next) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.redirect("/users/all");
  } catch (err) {
    next(err);
  }
});

router.post("/edit/:id", uploader.single("avatar"), async (req, res, next) => {
  try {
    const profileToUpdate = { ...req.body };
    if (req.file) profileToUpdate.avatar = req.file.path;
    await UserModel.findByIdAndUpdate(req.params.id, profileToUpdate);
    res.redirect("/users/all");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
