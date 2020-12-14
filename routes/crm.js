var express = require("express");
var router = express.Router();
const ClientModel = require("../models/Clients");
// const protectAdminRoute = require("./../middlewares/protectPrivateRoute");

// router.use(protectAdminRoute);

router.get("/dashboard", (req, res) => {
<<<<<<< HEAD
  res.render("dashboard");
=======
  res.render("dashboard", { title: "Dashboard" });
>>>>>>> 521e57da9d672e4b40252135eb822f9bfc62c8b9
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
