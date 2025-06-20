const express = require("express");
const cors = require("cors");
const connectToMongoose = require("./services/db.js");

const homepageRoute = require("./routes/homeRoute.js");
const scorerRoute = require("./routes/scorerRoute.js");
const tournamentRoute = require("./routes/tournamentRoute.js");
const cookieParser = require("cookie-parser");
const checkAuthCookie = require("./middlewares/authenticate.js");

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

//public route - doesn't require auth cookie
app.use("/api/cricscore/scorer", scorerRoute);

//protected route-requires auth cookie
app.use(checkAuthCookie("token"));
app.use("/api/cricscore/tournament", tournamentRoute);


// app.use("/api/cricscore/match", matchRoute);

//routes for login and signup and tournament
// app.use("/auth/", Authentication);
// app.use("/create/", Tournament, Match);
// app.use('api/notes', require('./routes/notes'));

//routes for viewer
app.use("/api/cricscore/", homepageRoute);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

connectToMongoose();
