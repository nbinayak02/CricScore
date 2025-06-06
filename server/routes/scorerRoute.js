const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.send({message: "Scorer Page"});
});

module.exports = router;