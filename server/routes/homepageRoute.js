const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.send({message: "Home Page"});
});

module.exports = router;