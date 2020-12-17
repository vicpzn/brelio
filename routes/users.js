var express = require("express");
const UserModel = require("../models/User");
const CompanyModel = require("../models/Company");
var router = express.Router();
const uploader = require("./../config/cloudinary");
const bcrypt = require("bcrypt");
const protectAdminManagerRoute = require("../middlewares/protectAdminManagerRoute");
const protectLogRoute = require("../middlewares/protectLogRoute");

router.get("/all", protectAdminManagerRoute, async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(
      req.session.currentUser._id
    ).populate("company");
    const users = await UserModel.find({
      company: currentUser.company,
    })
      .sort({ createdAt: -1 })
      .limit(5);
    res.render("list_users", { currentUser, users, title: "List of users" });
  } catch (err) {
    next(err);
  }
});

router.get("/create", protectAdminManagerRoute, async (req, res, next) => {
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

router.post(
  "/create",
  protectAdminManagerRoute,
  uploader.single("avatar"),
  async (req, res, next) => {
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
  }
);

router.get("/edit/:id", protectLogRoute, async (req, res, next) => {
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

router.get("/delete/:id", protectAdminManagerRoute, async (req, res, next) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.redirect("/users/all");
  } catch (err) {
    next(err);
  }
});

router.post(
  "/edit/:id",
  protectLogRoute,
  uploader.single("avatar"),
  async (req, res, next) => {
    try {
      const profileToUpdate = { ...req.body };
      if (req.file) profileToUpdate.avatar = req.file.path;
      await UserModel.findByIdAndUpdate(req.params.id, profileToUpdate);
      res.redirect(`/users/edit/${req.session.currentUser._id}`);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
