export const authMiddleware = (req, res, next) => {
  if (!req.session.userID) {
    return res.redirect("/login");
  }
  next();
};
