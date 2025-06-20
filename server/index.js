const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const connectToMongoose=require('./db');


const tournamentRoute = require("./routes/tournamentRoute.js");
const matchRoute = require("./routes/matchRoute.js");
const scorerRoute = require("./routes/scorerRoute.js");
const homepageRoute = require("./routes/homepageRoute.js");
const Authentication=require("./routes/Authentication.js");
const Tournament= require("./routes/Tournament.js");
const Match=require("./routes/Match.js");

const app = express();
// const PORT = process.env.PORT;
const PORT = 5000;

//for cors permission
const corsOption={
  origin: 'http://localhost:3000', // Allow frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization','password'],
  credentials: true
}

app.use(cors(corsOption));


app.use(express.json());





// //routes for scorer
// app.use("/api/cricscore/tournament", tournamentRoute);
// app.use("/api/cricscore/match", matchRoute);
// app.use("/api/cricscore/scorer", scorerRoute);



//routes for login and signup and tournament
app.use("/auth/", Authentication);
app.use("/create/",Tournament,Match);
// app.use('api/notes', require('./routes/notes'));



//routes for viewer
app.use("/api/cricscore/", homepageRoute);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

connectToMongoose();