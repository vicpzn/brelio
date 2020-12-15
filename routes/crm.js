var express = require("express");
var router = express.Router();
const ClientModel = require("../models/Clients");
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
    res.render("client_page", await ClientModel.findById(req.params.id));
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

router.get("/user/:id", (req, res) => {
  res.render("user_page");
});

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
