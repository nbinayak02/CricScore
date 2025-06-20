const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const tournamentRoute = require("./routes/tournamentRoute.js");
const matchRoute = require("./routes/matchRoute.js");
const scorerRoute = require("./routes/scorerRoute.js");
const homepageRoute = require("./routes/homepageRoute.js");

const app = express();
// const PORT = process.env.PORT;
const PORT = 5000;

//bypass cors policy to get req from frontend
app.use(cors({
    origin: 'http://localhost:3000'
}));


app.get("/", (req, res) => {
    res.send(
        {message:"Congratulaltion for api from fronted",
        status:200}
    );
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