var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("landing_page", { title: "Efficiency at its finest" });
});

router.get("/products", function (req, res, next) {
  res.render("products");
});

router.get("/prices", function (req, res, next) {
  res.render("prices");
});

router.get("/about", function (req, res, next) {
  res.render("about");
});

module.exports = router;
