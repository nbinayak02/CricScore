const express = require("express");
const router = express.Router();
const {
  handleCreateTournament,
} = require("../controllers/tournamentController");

router.get("/", (req, res) => {
  res.send({ message: "Tournament Page" });
});

router.post("/create", handleCreateTournament);
module.exports = router;
