const express = require("express");
const { handleScorerLogin, handleScorerSignup } = require("../controllers/scorerController");
const router = express.Router();


router.get("/", (req, res) => {
    res.send({message: "Scorer Page"});
});

router.post("/login", handleScorerLogin);
router.post("/signup", handleScorerSignup);

module.exports = router;