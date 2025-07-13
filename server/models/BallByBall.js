const { Schema, model } = require("mongoose");

const ballByBallSchema = new Schema({
    matchId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    tournamentId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    inning: {
        type: Number, // 1 or 2
        required: true,
    },
    over: {
        type: Number,
        required: true,
    },
    ball: {
        type: Number,
        required: true,
    },
    batsmen: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    bowler: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    run: {
        type: Number,
        required: true,
    },
    isWicket: {
        type: Boolean, //1 or 0
        required: true,
    },
    wicketType: {
        type: String, //catch, bowled etc.
    },

    //player who took catch, involved in run out, stumping etc.
    //array of object id because more than one player can be involved during run out

    wicketHelper: {
        type: [Schema.Types.ObjectId],
    },
    isExtra: {
        type: Boolean,
        required: true,
    },
    extraType: {
        type: String, //byes, wides, penalties
    },
    extraRun: {
        type: Number, 
    },
});

const Ball = model("BallByBall", ballByBallSchema);

module.exports = Ball;