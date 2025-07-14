const { Schema, model } = require("mongoose");
const PlayerSchema = new Schema(
  {
    tournamentId: {
      type: Schema.Types.ObjectId,
      ref: "tournaments",
      required: true,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "teams",
      required: true,
    },
    players: {
      type: Schema.Types.Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Players = model("players", PlayerSchema);
module.exports = Players;
