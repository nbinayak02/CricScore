const { Schema, model } = require("mongoose");

const scorerSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Scorer = model("scorer", scorerSchema);

module.exports = Scorer;
