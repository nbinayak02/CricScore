require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const tournamentRoute = require("./routes/tournamentRoute");
const matchRoute = require("./routes/matchRoute");
const scorerRoute = require("./routes/scorerRoute");
const homepageRoute = require("./routes/homepageRoute");

const app = express();
const PORT = process.env.PORT;

//bypass cors policy to get req from frontend
app.use(cors({
    origin: 'http://localhost:3000'
}));


app.get("/", (req, res) => {
    res.send('<h1>Hello World</h1>');
});



//routes for scorer
app.use("/api/cricscore/tournament", tournamentRoute);
app.use("/api/cricscore/match", matchRoute);
app.use("/api/cricscore/scorer", scorerRoute);

//routes for viewer
app.use("/api/cricscore/", homepageRoute);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});