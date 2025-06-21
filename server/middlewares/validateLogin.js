function validateLogin(req, res, next) {

  const { email, password } = req.body;

  if (!email || !email.trim()) {
    return res.status(422).json({ message: "Email cannot be empty" });
  }

  if (!password || !password.trim()) {
    return res.status(422).json({ message: "Password cannot be empty" });
  }

  if (password.length < 8) {
    return res.status(422).json({ message: "Password must contain atleast 8 chars." });
  }

  next();

}

module.exports = validateLogin;
