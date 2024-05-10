exports.Success = (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
};
exports.Failure = (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
};

exports.Logout = (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
};
