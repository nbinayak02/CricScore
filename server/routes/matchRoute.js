const { Router } = require('express');
const router = Router();

router.get("/", (req, res) => {
    res.send({message: "Match page"});
});

module.exports = router;