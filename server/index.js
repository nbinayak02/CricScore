require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const tournamentRoute = require("./routes/tournamentRoute.js");
const matchRoute = require("./routes/matchRoute.js");
const scorerRoute = require("./routes/scorerRoute.js");
const homepageRoute = require("./routes/homepageRoute.js");

const app = express();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDb"))
  .catch((error) => console.log("Failed to connect to MongoDb: " + error));

//bypass cors policy to get req from frontend
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.send({ message: "Congratulaltion for api from fronted", status: 200 });
});

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


//routes for scorer
app.use("/api/cricscore/tournament", tournamentRoute);
app.use("/api/cricscore/match", matchRoute);
app.use("/api/cricscore/scorer", scorerRoute);

//routes for viewer
app.use("/api/cricscore/", homepageRoute);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
