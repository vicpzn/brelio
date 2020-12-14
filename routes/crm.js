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

module.exports = router;
