const Team = require("../models/Teams");
const Tournament = require("../models/Tournment");

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
    return res.status(422).json({ message: error });
  }
}

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

async function handleGetTourById(req, res) {
  const _id = req.params.id;

  if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      message: "Invalid tournament ID format",
    });
  }

  try {
    const tournament = await Tournament.findById({ _id }).populate(
      "createdBy",
      "fullName"
    );
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    return res.status(200).json({ message: "Found", data: tournament });
  } catch (error) {
    return res.status(500).json({ message: "Error: " + error });
  }
}

async function handleCreateTeam(req, res) {
  const { teamName, squad, teamCoach } = req.body;
  const tourId = req.params.id;

  try {
    await Team.create({
      teamName,
      squad,
      teamCoach,
      tournament: tourId,
      createdBy: req.scorer._id,
    });
    return res.status(201).json({ message: "Team Created Successfully" });
  } catch (error) {
    return res.status(422).json({ message: error });
  }
}

async function handleGetAllTeams(req, res) {

  const tourId = req.params.id;

  try{
    const teams = await Team.find({tournament: tourId});
    return res.status(200).json({ message: "Found", data: teams });
    
  } catch(error){
    return res.status(422).json({ message: error });
  }

}

module.exports = {
  handleCreateTournament,
  handleShowAllTournament,
  handleGetTourById,
  handleCreateTeam,
  handleGetAllTeams,
};
