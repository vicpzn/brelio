var express = require("express");
var router = express.Router();
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

module.exports = router;
