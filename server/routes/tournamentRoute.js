const {Router} = require("express");
const router = Router();

router.get('/', (req, res) => {
    res.send({message: "Tournament Page"});
});

module.exports = router;