const express = require("express");
const cors = require("cors");
const connectToMongoose = require("./services/db.js");

const homepageRoute = require("./routes/homeRoute.js");
const scorerRoute = require("./routes/scorerRoute.js");
const tournamentRoute = require("./routes/tournamentRoute.js");
const playersRoute = require("./routes/playersRoute.js");
const cookieParser = require("cookie-parser");
const checkAuthCookie = require("./middlewares/authenticate.js");
const Match=require('./routes/Match.js');
const matchRoute =require('./routes/matchRoute.js');

const app = express();

const PORT = process.env.PORT || 5000;

//for cors permission
const corsOption = {
  origin: "http://localhost:3000", // Allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "password"],
  credentials: true,
};

//core middlewares
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// app.use("/api/chatgpt",OpenAI);
//public route - doesn't require auth cookie
app.use("/api/cricscore/scorer", scorerRoute);

//protected route-requires auth cookie
app.use(checkAuthCookie("token"));
app.use("/api/cricscore/tournament", tournamentRoute);



// app.use("/api/cricscore/match", matchRoute);
app.use("/api/cricscore/match", matchRoute);

app.use("/api/cricscore/players", playersRoute);
app.use("/api/cricscore/match",  matchRoute);



//routes for viewer
app.use("/api/cricscore/", homepageRoute);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

connectToMongoose();
