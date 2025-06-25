import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar.js";
import { Login } from "./components/Login.js";
import { Signup } from "./components/Signup.js";
import { Welcome } from "./components/welcome.js";
import { Tournament } from "./components/Tournament.js";
import { Match } from "./components/Match.js";
import { Scoring } from "./components/Scoring.js";
import SetupTournament from "./components/SetupTournament.js"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tournament" element={<Tournament />} />
        <Route path="/match" element={<Match />} />
        <Route path="/scoring" element={<Scoring />} />
        <Route path="/tournament/:id" element={<SetupTournament />}/>
      </Routes>
    </>
  );
}

export default App;
