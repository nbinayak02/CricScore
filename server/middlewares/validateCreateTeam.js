const validateTeam = (req, res, next) => {
  const { teamName, squad } = req.body;

  if (!teamName || !teamName.trim()) {
    return res.status(422).json({ message: "Team Name cannot be empty" });
  }

  if (!squad || !squad.trim()) {
    return res.status(422).json({ message: "Squad cannot be empty" });
  } else {
    const squadArray = squad.split(",");

    if (squadArray.length < 11) {
      return res
        .status(422)
        .json({ message: "Squad must contain at least 11 players" });
    }
  }

  next();
  
};

module.exports = validateTeam;
