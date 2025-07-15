const express = require("express");
const router = express.Router();
const {
    handleCreateMatch,
    handleGetMatches,
    handleDeleteMatch,
    handleUpdateMatch,
    handlePreMatch,
} = require("../controllers/matchController");

router.post("/", handleCreateMatch);
router.get("/:scorerId", handleGetMatches);
router.put("/:matchId", handleUpdateMatch);
router.delete("/:matchId", handleDeleteMatch);

router.put("/prematch/:matchId", handlePreMatch);


module.exports = router;