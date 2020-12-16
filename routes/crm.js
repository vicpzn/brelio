var express = require("express");
const UserModel = require("../models/User");
var router = express.Router();
const ClientModel = require("../models/Clients");
const CompanyModel = require("../models/Company");

const uploader = require("./../config/cloudinary");
const bcrypt = require("bcrypt");
// const protectAdminRoute = require("./../middlewares/protectPrivateRoute");

// router.use(protectAdminRoute);

router.get("/dashboard", (req, res) => {
  res.render("dashboard", { title: "Dashboard" });
});

router.get("/dashboard/register", (req, res) => {
  res.render("register_company");
});

router.get("/account-management", async (req, res, next) => {
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

router.get("/api/clients", async (req, res) => {
  try {
    res.json(await ClientModel.find());
  } catch (err) {
    res.json(err);
  }
});

router.get("/api/clients/:id", async (req, res) => {
  try {
    res.json(await ClientModel.findById(req.params.id));
  } catch (err) {
    res.json(err);
  }
});

router.patch("/api/edit/clients/:id", async (req, res) => {
  try {
    res.json(await ClientModel.findByIdAndUpdate(req.params.id, req.body));
  } catch (err) {
    res.json(err);
  }
});

router.get("/account-management/add", (req, res) => {
  res.render("new-account", { title: "Add a new prospect" });
});

router.post("/account-management/add", async (req, res, next) => {
  try {
    await ClientModel.create(req.body);
    res.redirect("/account-management");
  } catch (err) {
    next(err);
  }
});

router.get("/account-management/:id", async (req, res, next) => {
  try {
    let client = await ClientModel.findById(req.params.id);
    res.render("client_page", { client, script: "client-page.js" });
  } catch (err) {
    next(err);
  }
});

router.get("/account-management/delete/:id", async (req, res, next) => {
  try {
    await ClientModel.findByIdAndDelete(req.params.id);
    res.redirect("/account-management");
  } catch (err) {
    next(err);
  }
});

router.get("/users", async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.render("list_users", { users, title: "List of users" });
  } catch (err) {
    next(err);
  }
});

router.get("/users/create", async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.render("create_user", { users, title: "Create a new user" });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/users/create",
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
        res.redirect("/users/");
      }
    } catch (error) {
      next(error);
    }
  }
);

router.get("/users/edit/:id", async (req, res, next) => {
  try {
    res.render("edit_user", await UserModel.findById(req.params.id));
  } catch (err) {
    next(err);
  }
});

router.get("/users/delete/:id", async (req, res, next) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.redirect("/users");
  } catch (err) {
    next(err);
  }
});

router.post(
  "/users/edit/:id",
  uploader.single("avatar"),
  async (req, res, next) => {
    try {
      const profileToUpdate = { ...req.body };
      if (req.file) profileToUpdate.avatar = req.file.path;
      await UserModel.findByIdAndUpdate(req.params.id, profileToUpdate);
      res.redirect("/users");
    } catch (err) {
      next(err);
    }
  }
);

router.post("/add-prospect", async (req, res, next) => {
  try {
    await ClientModel.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

router.post("/dashboard/register", async (req, res, next) => {
  try {
    await CompanyModel.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

router.get("/dashboard/settings/", (req, res, next) => {
  try {
    res.render("settings");
  } catch (err) {
    next(err);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    console.log(req.query);
    const exp = new RegExp(req.query.search);
    const matchedUser = await ClientModel.find({
      $or: [
        { firstname: { $regex: exp } },
        { lastname: { $regex: exp } },
        { email: { $regex: exp } },
        { phonenumber: { $regex: exp } },
      ],
    });
    res.json({
      matchedUser,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
