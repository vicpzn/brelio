var express = require("express");
var router = express.Router();
const ClientModel = require("../models/Clients");
// const protectAdminRoute = require("./../middlewares/protectPrivateRoute");

// router.use(protectAdminRoute);

router.get("/dashboard", (req, res) => {
  res.send("dashboard");
});

router.get("/account-management", (req, res) => {
  res.send("account-management");
});

router.get("/account-management/:id", (req, res) => {
  res.send("account management id");
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
