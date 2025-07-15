const Match = require("../models/Match");

async function handleCreateMatch(req, res) {
  try {
    const { match_time, match_date } = req.body;
    const matchExists = await Match.findOne({ match_time, match_date });
    if (matchExists) {
      return res
        .status(422)
        .json({ message: "Match already exist at given date and time" });
    }

    await Match.create({
      tournament_id: req.body.tournament_id,
      tournament_name: req.body.tournament_name,
      teamA: req.body.teamA,
      teamB: req.body.teamB,
      teamA_id: req.body.teamA_id,
      teamB_id: req.body.teamB_id,
      match_date: req.body.match_date,
      match_time: req.body.match_time,
      venue: req.body.venue,
      createdBy: req.scorer._id,
    });

    return res.status(201).json({ message: "Match created successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Some error occured while creating match" });
  }
}

async function handleGetMatches(req, res) {
  const scorer = req.params.scorerId;

  try {
    const matches = await Match.find({ createdBy: scorer }).select(
      "-toss -umpires -matchRefree -innings -result -points"
    );
    if (matches.length === 0) {
      return res.status(404).json({ message: "No matches found" });
    }
    return res.status(200).json({ message: "Found", data: matches });
  } catch (error) {
    console.log(error);
    return res
      .status(422)
      .json({ message: "Some error occured while fetching matches" });
  }
}
async function handleUpdateMatch(req, res) {
  try {
    const matchId = req.params.matchId;
    const isUpdated = await Match.findByIdAndUpdate(
      matchId,
      { $set: req.body },
      { new: true }
    );
    if (!isUpdated) {
      return res.status(500).json({ message: "Failed to update." });
    }
    return res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Some error occured while updating match" });
  }
}
async function handleDeleteMatch(req, res) {
  try {
    const matchId = req.params.matchId;
    const match = await Match.findByIdAndDelete(matchId);
    if (!match) {
      return res.status(500).json({ message: "Failed to delete." });
    }
    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Some error occured while deleting match" });
  }
}

async function handlePreMatch(req, res) {
  console.log(req.body);

  try {
    const matchId = req.params.matchId;
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(422).json({ message: "Match not found" });
    }
    await Match.findByIdAndUpdate(
      matchId,
      {
        toss: { wonBy: req.body.tossWinner, decision: req.body.decision },
        umpires: {
          onField: req.body.onfield.split(","),
          third: req.body.third,
          tv: req.body.tv,
        },
        matchRefree: req.body.r,
      }
    );
    return res.status(200).json({ message: "Prematch updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while updating prematch data" });
  }
}

module.exports = {
  handleCreateMatch,
  handleGetMatches,
  handleUpdateMatch,
  handleDeleteMatch,
  handlePreMatch,
};
