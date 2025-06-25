const { Schema, model } = require("mongoose");

const TeamSchema = new Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    squad: {
      type: String,
      required: true,
    },
    teamCoach: {
      type: String,
    },
    tournament: {
        type: Schema.Types.ObjectId,
        ref: 'tournaments',
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'scorers',
        required: true,
    }
  },
  { timestamps: true }
);

const Team = model("teams", TeamSchema);

module.exports = Team;
