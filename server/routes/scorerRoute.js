const express = require("express");
const {
  handleScorerSignup,
  handleScorerLogin,
} = require("../controllers/scorerController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ message: "Scorer Page" });
});

router.post("/signup", handleScorerSignup);
router.post("/login", handleScorerLogin);

module.exports = router;
