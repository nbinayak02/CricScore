const express = require("express");
const { handleBallByBallData } = require("../controllers/ballByBallController");
const router = express.Router();

router.post("/", handleBallByBallData);

module.exports = router;