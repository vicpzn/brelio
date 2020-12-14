var express = require("express");
var router = express.Router();
const ClientModel = require("../models/Clients");
// const protectAdminRoute = require("./../middlewares/protectPrivateRoute");

// router.use(protectAdminRoute);

router.get("/dashboard", (req, res) => {
  res.send("hey");
});

router.get("/account-management", (req, res) => {
  res.send("hey");
});

router.get("/account-management/:id", (req, res) => {
  res.send("hey");
});

router.post("/add-prospect", async (req, res, next) => {
  try {
    await ClientModel.create(req.body);
    res.send("hey");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
