module.exports = function protectPrivateRoute(req, res, next) {
  if (
    req.session.currentUser.role === "admin" ||
    req.session.currentUser.role === "manager"
  )
    next();
  else res.redirect("/signin");
};
