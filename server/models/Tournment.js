const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tournamentSchema = new Schema(
  {
    tournament_name: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    locMap: {
      type: String,
    },
    format: {
      type: Number,
      required: true,
    },
    organizer: {
      type: String,
    },

    description: {
      type: String,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'scorers',
      required: true,
    }
  },
  { timestamps: true }
);


const Tournament = model("tournaments", tournamentSchema);

module.exports = Tournament;
