module.exports = function protectPrivateRoute(req, res, next) {
  if (req.session.currentUser.role === "admin") next();
  else res.redirect("/signin");
};
