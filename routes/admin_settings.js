var express = require("express");
const UserModel = require("../models/User");
const CompanyModel = require("../models/Company");
var router = express.Router();
const uploader = require("../config/cloudinary");
const bcrypt = require("bcrypt");
const protectAdminRoute = require("../middlewares/protectAdminRoute");

router.get("/", protectAdminRoute, async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(
      req.session.currentUser._id
    ).populate("company");
    const companies = await CompanyModel.find()
      .sort({ createdAt: -1 })
      .limit(5);
    const members = await UserModel.find().sort({ createdAt: -1 }).limit(5);
    res.render("admin/settings_admin", {
      members,
      currentUser,
      companies,
      title: "Admin Settings",
    });
  } catch (err) {
    next(err);
  }
});

router.get("/companies/all", protectAdminRoute, async (req, res, next) => {
  try {
    const companies = await CompanyModel.find();
    res.render("admin/list_companies", {
      companies,
      title: "List of companies",
    });
  } catch (err) {
    next(err);
  }
});

router.get("/companies/create", protectAdminRoute, async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(req.session.currentUser._id);
    const currentCompany = await CompanyModel.find({
      _id: currentUser.company,
    });
    res.render("admin/add_company", {
      currentCompany,
      title: "Add a company",
    });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/companies/create",
  protectAdminRoute,
  uploader.single("logo"),
  async (req, res, next) => {
    try {
      const companyToRegister = { ...req.body };
      companyToRegister.creator = await UserModel.findById(
        req.session.currentUser._id
      );
      if (req.file) companyToRegister.logo = req.file.path;
      await CompanyModel.create(companyToRegister);
      res.redirect("/dashboard/settings/admin");
    } catch (err) {
      next(err);
    }
  }
);

router.get("/companies/edit/:id", protectAdminRoute, async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(req.session.currentUser._id);
    console.log(currentUser);
    const company = await CompanyModel.findById(req.params.id);
    res.render("admin/edit_company", {
      title: "Edit a company",
      company,
      currentUser,
    });
  } catch (err) {
    next(err);
  }
});

router.get(
  "/companies/delete/:id",
  protectAdminRoute,
  async (req, res, next) => {
    try {
      await CompanyModel.findByIdAndDelete(req.params.id);
      res.redirect("/dashboard/settings/admin");
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/companies/edit/:id",
  protectAdminRoute,
  uploader.single("logo"),
  async (req, res, next) => {
    try {
      const companyToUpdate = { ...req.body };
      if (req.file) companyToUpdate.avatar = req.file.path;
      await CompanyModel.findByIdAndUpdate(req.params.id, companyToUpdate);
      res.redirect("/dashboard/settings/admin");
    } catch (err) {
      next(err);
    }
  }
);

router.get("/users/all", protectAdminRoute, async (req, res, next) => {
  try {
    const users = await UserModel.find().sort({ createdAt: -1 });
    res.render("admin/list_users_admin", { users, title: "List of users" });
  } catch (err) {
    next(err);
  }
});

router.get("/users/create", protectAdminRoute, async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(req.session.currentUser._id);
    const currentCompany = await CompanyModel.find({
      _id: currentUser.company,
    });
    res.render("register_company", {
      currentCompany,
      title: "Add a company",
    });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/users/create",
  protectAdminRoute,
  uploader.single("avatar"),
  async (req, res, next) => {
    try {
      const newUser = { ...req.body };
      const foundUser = await UserModel.findOne({ email: newUser.email });
      if (req.file) newUser.avatar = req.file.path;
      if (foundUser) {
        req.flash(
          "warning",
          "Email already registered. Please try with another address."
        );
        res.redirect("/users/create");
      } else {
        const hashedPassword = bcrypt.hashSync(newUser.password, 10);
        newUser.password = hashedPassword;
        await UserModel.create(newUser);
        req.flash("success", "Successfully registered.");
        res.redirect("/users/all");
      }
    } catch (error) {
      next(error);
    }
  }
);

router.get("/users/edit/:id", protectAdminRoute, async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const currentUser = await UserModel.findById(req.session.currentUser._id);
    const companies = await CompanyModel.find();
    res.render("admin/edit_user_admin", {
      title: "Edit a profile",
      user,
      currentUser,
      companies,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/users/delete/:id", protectAdminRoute, async (req, res, next) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.redirect("/dashboard/settings/admin");
  } catch (err) {
    next(err);
  }
});

router.post(
  "/users/edit/:id",
  protectAdminRoute,
  uploader.single("avatar"),
  async (req, res, next) => {
    try {
      const profileToUpdate = { ...req.body };
      if (req.file) profileToUpdate.avatar = req.file.path;
      await UserModel.findByIdAndUpdate(req.params.id, profileToUpdate);
      res.redirect("/dashboard/settings/admin");
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
