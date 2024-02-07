export const isLoggedIn = (req, res, next) => {
  if (!req.session.userID) {
    return res.redirect("/login");
  }
  next();
};
