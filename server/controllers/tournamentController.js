const Tournament = require("../models/Tournment");

async function handleCreateTournament(req, res) {
  const tournament = req.body;
  console.log(req.scorer);

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

    return res.status(200).json({ message: "Tournament Created Successfully" });

  } catch (error) {
    return res
      .status(422)
      .json({ message: "Error creating tournament: " + error });
  }
}

module.exports = {
  handleCreateTournament,
};
