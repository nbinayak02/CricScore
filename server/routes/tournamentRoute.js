const express = require("express");
const router = express.Router();
const {
  handleCreateTournament,
  handleShowAllTournament,
  handleGetTourById,
  handleCreateTeam,
  handleGetAllTeams
} = require("../controllers/tournamentController");
const validateTournament = require("../middlewares/validateCreateTournament");
const validateTeam = require("../middlewares/validateCreateTeam");

router.get("/", handleShowAllTournament);
router.post("/create", validateTournament, handleCreateTournament);
router.get("/:id", handleGetTourById);
router.post("/:id/teams", validateTeam, handleCreateTeam);
router.get("/:id/teams", handleGetAllTeams);


module.exports = router;
