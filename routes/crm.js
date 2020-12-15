var express = require("express");
const UserModel = require("../models/User");
var router = express.Router();
const ClientModel = require("../models/Clients");
const uploader = require("./../config/cloudinary");
// const protectAdminRoute = require("./../middlewares/protectPrivateRoute");

// router.use(protectAdminRoute);

router.get("/dashboard", (req, res) => {
  res.render("dashboard", { title: "Dashboard" });
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
