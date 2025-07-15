const express = require("express");
const { handleAddPlayers, handleGetPlayers, handleDeletePlayers } = require("../controllers/playersController");
const router = express.Router()

router.post("/", handleAddPlayers);
router.get("/:tourId/:teamId", handleGetPlayers);
router.delete("/:id", handleDeletePlayers)

module.exports = router;