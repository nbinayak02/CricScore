const express = require("express");
const {
  handleScorerLogin,
  handleScorerSignup,
} = require("../controllers/scorerController");
const validateScorer = require("../middlewares/validateCreateScorer");
const validateLogin = require("../middlewares/validateLogin");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ message: "Scorer Page" });
});

router.post("/login", validateLogin, handleScorerLogin);
router.post("/signup", validateScorer, handleScorerSignup);

module.exports = router;
