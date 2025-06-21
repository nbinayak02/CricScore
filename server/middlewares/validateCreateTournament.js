function validateTournament(req, res, next) {
  const { tournament_name, start_date, end_date, venue, location, format } =
    req.body;

  if (!tournament_name || !tournament_name.trim()) {
    return res.status(422).json({ message: "Tournament name cannot be empty" });
  }

  if (!start_date) {
    return res.status(422).json({ message: "Start Date cannot be empty" });
  }

  if (!end_date) {
    return res.status(422).json({ message: "End Date cannot be empty" });
  }

  //if end date is earlier than start
  if (new Date(start_date) > new Date(end_date)) {
    return res
      .status(422)
      .json({ message: "Start date cannot be after end date" });
  }

  //if start date is already past
  if (new Date(start_date) < new Date()) {
    return res
      .status(422)
      .json({ message: "Start date cannot be in the past" });
  }

  if (!venue || !venue.trim()) {
    return res.status(422).json({ message: "Venue cannot be empty" });
  }

  if (!location || !location.trim()) {
    return res.status(422).json({ message: "Location cannot be empty" });
  }

  if (!format || isNaN(format)) {
    return res
      .status(422)
      .json({
        message: "Format cannot be empty. It should contain numbers of overs",
      });
  } else if (format == 0) {
    return res.status(422).json({ message: "Format should be greater than 0" });
  }

  next();
}

module.exports = validateTournament;