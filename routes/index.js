var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("landing_page", { title: "Efficiency at its finest" });
});

module.exports = router;
