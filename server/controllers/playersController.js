const Players = require("../models/Players");
async function handleAddPlayers(req, res) {
  try {
    const pExists = await Players.find({
      tournamentId: req.body.tourId,
      teamId: req.body.teamId,
    });
    if (pExists.length > 0) {
      return res
        .status(500)
        .json({ message: "Players are already added for this team" });
    }
    await Players.create({
      tournamentId: req.body.tourId,
      teamId: req.body.teamId,
      players: req.body.players,
    });
    return res.status(201).json({ message: "Players added successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while adding players" });
  }
}

async function handleGetPlayers(req, res) {
  try {
    const tourId = req.params.tourId;
    const teamId = req.params.teamId;
    const players = await Players.find({
      tournamentId: tourId,
      teamId: teamId,
    }).select("-tournamentId -teamId");
    if (players.length !== 0) {
      return res
        .status(200)
        .json({ message: "Players fetched successfully", players: players });
    }
    return res.status(404).json({ message: "Players not found" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while fetching players." });
  }
}

async function handleDeletePlayers(req, res) {
  try {
    const id = req.params.id;
    await Players.findByIdAndDelete({ _id:id });
    return res.status(200);
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Something went wrong while deleting players" });
  }
}

module.exports = {
  handleAddPlayers,
  handleGetPlayers,
  handleDeletePlayers,
};
