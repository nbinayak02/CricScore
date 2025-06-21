const express = require("express");
const router = express.Router();
const {
  handleCreateTournament,
  handleShowAllTournament,
} = require("../controllers/tournamentController");
const validateTournament = require("../middlewares/validateCreateTournament");

router.get("/", handleShowAllTournament);
router.post("/create", validateTournament, handleCreateTournament);

module.exports = router;
