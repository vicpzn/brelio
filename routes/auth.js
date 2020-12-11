const express = require("express");
const router = new express.Router();
const UserModel = require("../models/User");

router.get("/signup", function (req, res) {
  res.send("signup");
});

module.exports = router;
