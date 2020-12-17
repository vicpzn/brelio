const express = require("express");
const router = new express.Router();
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const CompanyModel = require("../models/Company");

router.get("/signup", async (req, res, next) => {
  try {
    const companies = await CompanyModel.find();
    res.render("signup", { companies, title: "Sign up" });
  } catch (err) {
    next(err);
  }
});

router.get("/signin", (req, res) => {
  res.render("signin", { title: "Log in" });
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await UserModel.findOne({ email: email });
  if (!foundUser) {
    req.flash("error", "Email not found");
    res.redirect("/signin");
  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      req.flash("error", "Wrong password");
      res.redirect("/signin");
    } else {
      const userObject = foundUser.toObject();
      delete userObject.password;
      req.session.currentUser = userObject;
      req.flash("success", "Successfully logged in");
      res.redirect("/dashboard");
    }
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await UserModel.findOne({ email: newUser.email });
    if (foundUser) {
      req.flash(
        "warning",
        "Email already registered. Please try with another address."
      );
      res.redirect("/signup");
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      await UserModel.create(newUser);
      req.flash("success", "Successfully registered.");
      res.redirect("/dashboard/register");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/logout", async (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("/signin");
  });
});

module.exports = router;
