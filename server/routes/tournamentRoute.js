const express = require("express");
const router = express.Router();
const {
  handleCreateTournament,
  handleShowAllTournament,
  handleUpdateTournament,
  handleDeleteTournament
} = require("../controllers/tournamentController");
const validateTournament = require("../middlewares/validateCreateTournament");

router.get("/", handleShowAllTournament);
router.post("/create", validateTournament, handleCreateTournament);
router.put("/update", validateTournament, handleUpdateTournament);
router.post("/delete", handleDeleteTournament);

module.exports = router;
