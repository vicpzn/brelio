var express = require("express");
var router = express.Router();
const ClientModel = require("../models/Clients");
// const protectAdminRoute = require("./../middlewares/protectPrivateRoute");

// router.use(protectAdminRoute);

router.get("/dashboard", (req, res) => {
  res.send("dashboard");
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

router.get("/account-management/:id", async (req, res, next) => {
  try {
    res.render("client_page", await ClientModel.findById(req.params.id));
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

module.exports = router;
