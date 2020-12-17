var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("landing_page", { title: "Efficiency at its finest" });
});

router.get("/products", function (req, res, next) {
  res.render("products", { title: "Products" });
});

router.get("/prices", function (req, res, next) {
  res.render("prices", { title: "Prices" });
});

router.get("/about", function (req, res, next) {
  res.render("about", { title: "About" });
});

module.exports = router;
