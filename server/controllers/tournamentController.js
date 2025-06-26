const Tournament = require("../models/Tournment");
  const mongoose = require("mongoose");

async function handleCreateTournament(req, res) {
  const tournament = req.body;
  try {
    await Tournament.create({
      tournament_name: tournament.tournament_name,
      start_date: tournament.start_date,
      end_date: tournament.end_date,
      venue: tournament.venue,
      location: tournament.location,
      locMap: tournament.locFromMap || null,
      format: tournament.format,
      organizer: tournament.organizer || null,
      description: tournament.description || null,
      createdBy: req.scorer._id,
    });

    return res.status(201).json({ message: "Tournament Created Successfully" });
  } catch (error) {
    return res
      .status(422)
      .json({ message: error });
  }
}
async function handleUpdateTournament(req, res) {
  const tournamentUpdate = req.body;
  console.log("tring update:"+tournamentUpdate);
  try {
    const tournament=await Tournament.findByIdAndUpdate(tournamentUpdate._id, { $set: req.body })  // Update data from request body

    if(!tournament){
   return res.status(404).json({ error: "Tournament not found" });
    }

    return  res.json({ success: true, data:tournament, message: "Tournament Updated Successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
async function handleDeleteTournament(req, res) {

const { _id } = req.body;

  // Validate
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(422).json({ error: "Invalid Tournament ID format" });
  }

  try {
    const objectId = new mongoose.Types.ObjectId(_id);

    const tournament = await Tournament.findByIdAndDelete(objectId);

    if(!tournament){
   return res.status(404).json({ error: "Tournament not found" });
    }

    return  res.json({ success: true, message: "Tournament Deleted Successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

async function handleShowAllTournament(req, res) {
  const scorerId = req.scorer._id;

  try {
    const scorerTournament = await Tournament.find({ createdBy: scorerId });

    if (scorerTournament.length === 0) {
      return res.status(200).json({ message: "No tournaments", data: [] });
    }

    return res
      .status(200)
      .json({ message: "Tournament fetch successful", data: scorerTournament });
  } catch (error) {
    return res.status(500).json({ message: "Error: " + error });
  }
}

module.exports = {
  handleCreateTournament,
  handleUpdateTournament,
  handleDeleteTournament,
  handleShowAllTournament,
};
