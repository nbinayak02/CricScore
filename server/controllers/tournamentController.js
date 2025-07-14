const Team = require("../models/Teams");
const Tournament = require("../models/Tournment");
const Teams = require("../models/Teams");
const mongoose = require("mongoose");
const { response } = require("express");

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
async function handleUpdateTournament(req, res) {
  const tournamentUpdate = req.body;
  try {
    const tournament = await Tournament.findByIdAndUpdate(
      tournamentUpdate._id,
      { $set: req.body }
    ); // Update data from request body

    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    return res.json({
      success: true,
      data: tournament,
      message: "Tournament Updated Successfully",
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Server error" });
  }
}
async function handleDeleteTournament(req, res) {
  const { _id } = req.body;

  // Validate
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(422).json({ error: "Invalid Tournament ID format" });
  }

  try {
    const objectId = new mongoose.Types.ObjectId(_id);

    const tournament = await Tournament.findByIdAndDelete(objectId);

    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    return res.json({
      success: true,
      message: "Tournament Deleted Successfully",
    });
  } catch (error) {
    console.error(" Tournament Delete error:", error);
    res.status(500).json({ error: "Server error" });
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
  const { teamName, teamCoach } = req.body;
  const tourId = req.params.id;

  try {
    await Team.create({
      teamName,
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

  try {
    const teams = await Team.find({ tournament: tourId });
    return res.status(200).json({ message: "Found", data: teams });
  } catch (error) {
    return res.status(422).json({ message: error });
  }
}

async function handleDeleteTeam(req, res) {
  const id = req.params.id;

  // Validate
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ error: "Invalid Team ID format" });
  }

  try {
    const TeamId = new mongoose.Types.ObjectId(id);

    const team = await Teams.findByIdAndDelete(TeamId);
    if (!team) {
      return res.status(404).json({ error: "Team Not Found" });
    }

    return res.json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Team Delete error:", error);
    res.status(500).json({ error: "Server error" });
  }
}
async function handleUpdateTeam(req, res) {
  const teamUpdate = req.body;
  try {
    const team = await Teams.findByIdAndUpdate(teamUpdate._id, {
      $set: req.body,
    }); // Update data from request body

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    return res.json({
      success: true,
      data: team,
      message: "Team Updated Successfully",
    });
  } catch (error) {
    console.error("Team Update error:", error);
    res.status(500).json({ error: "Server error" });
  }
}
async function handleGetTeamById(req, res) {
  const { id } = req.params;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid team ID format." });
  }

  try {
    const teamid = new mongoose.Types.ObjectId(id);

    const team = await Team.findById(teamid);
    if (!team) {
      return res.status(404).json({ error: "Team not found." });
    }

    return res
      .status(200)
      .json({ data: team, message: "Team fetch successful." });
  } catch (error) {
    console.error("Error fetching team:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = {
  handleCreateTournament,
  handleUpdateTournament,
  handleDeleteTournament,
  handleShowAllTournament,
  handleGetTourById,
  handleCreateTeam,
  handleGetAllTeams,
  handleDeleteTeam,
  handleUpdateTeam,
  handleGetTeamById,
};
