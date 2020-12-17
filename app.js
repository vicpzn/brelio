require("dotenv").config();
require("./config/mongodb");
require("./helpers/hbs");

var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
const hbs = require("hbs");
var cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var apiRouter = require("./routes/api");
var dashboardRouter = require("./routes/dashboard");
var accountManagementRouter = require("./routes/account_management");
var adminSettingsRouter = require("./routes/admin_settings");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// SESSION SETUP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 86400000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60,
    }),
    saveUninitialized: true,
    resave: true,
  })
);

app.use(flash());

app.use(require("./middlewares/exposeLoginStatus"));
app.use(require("./middlewares/exposeFlashMessage"));

// app.locals.site_url = process.env.SITE_URL; // we don't have a SITE_URL in .env

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/", authRouter);
app.use("/api", apiRouter);
app.use("/dashboard", dashboardRouter);
app.use("/account-management", accountManagementRouter);
app.use("/dashboard/settings/admin", adminSettingsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
