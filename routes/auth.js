const express = require("express");
const router = new express.Router();
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign up" });
});

router.get("/signin", (req, res) => {
  res.render("signin", { title: "Log in" });
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await UserModel.findOne({ email: email });
  if (!foundUser) {
    // req.flash("error", "invalid credentials");
    res.redirect("/signin");
  } else {
    const userObject = foundUser.toObject();
    delete userObject.password;
    req.session.currentUser = userObject;
    // req.flash("success", "successfully logged in");
    res.redirect("/dashboard");
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await UserModel.findOne({ email: newUser.email });

    if (foundUser) {
      // req.flash("warning", "email already registered");
      res.redirect("/signup");
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      await UserModel.create(newUser);
      // req.flash("success", "successfully registered");
      res.redirect("/signin");
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
