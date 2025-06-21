const Tournament = require("../models/Tournment");

async function handleCreateTournament(req, res) {

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
      .json({ message: "Error creating tournament: " + error });
  }
}

async function handleShowAllTournament(req, res) {
  const scorerId = req.scorer._id;

  try {
    const scorerTournament = await Tournament.find({ createdBy: scorerId });

    if (scorerTournament.length === 0) {
      return res.status(200).json({ message: "No tournaments", data: [] });
    }

    console.log(scorerTournament);

    return res
      .status(200)
      .json({ message: "Tournament fetch successful", data: scorerTournament });
  } catch (error) {
    return res.status(500).json({ message: "Error: " + error });
  }
}

module.exports = {
  handleCreateTournament,
  handleShowAllTournament,
};
