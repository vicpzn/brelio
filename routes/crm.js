var express = require("express");
const UserModel = require("../models/User");
var router = express.Router();
const ClientModel = require("../models/Clients");
const CompanyModel = require("../models/Company");
const uploader = require("./../config/cloudinary");
const bcrypt = require("bcrypt");
// const protectAdminRoute = require("./../middlewares/protectPrivateRoute");

// router.use(protectAdminRoute);

// SEARCH BAR

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
