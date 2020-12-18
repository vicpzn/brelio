var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("landing/landing_page", { title: "Efficiency at its finest" });
});

router.get("/products", function (req, res, next) {
  res.render("landing/products", { title: "Products" });
});

router.get("/prices", function (req, res, next) {
  res.render("landing/prices", { title: "Prices" });
});

router.get("/about", function (req, res, next) {
  res.render("landing/about", { title: "About us" });
});

module.exports = router;
