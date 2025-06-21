function validateScorer(req, res, next) {
  const { fullName, email, password } = req.body;

  if (!fullName || !fullName.trim()) {
    return res.status(422).json({ message: "Full Name cannot be empty" });
  }

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

module.exports = validateScorer;
