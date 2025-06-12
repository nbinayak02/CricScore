import "./App.css";
import { useEffect, useState } from "react";
import { getHomePage } from "./api/homepage.js";
import Card from "./components/card.jsx";
import { ErrorBoundary } from "react-error-boundary";
import { Navbar } from "./components/Navbar.js";
import { Login } from "./components/Login.js";
import { Signup } from "./components/Signup.js";
import { Welcome } from "./components/welcome.js";
import { Tournament } from "./components/Tournment.js";
import { Match } from "./components/Match.js";
import { Scoring } from "./components/Scoring.js";

function App() {
  const [message, setMessage] = useState(null);

  // useEffect(() => {
  //   getHomePage().then((m) => {
  //     setMessage(m);
  //     // console.log(message);
  //   });
  // }, []);

  return (
    <div>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Navbar/>
      <Scoring></Scoring>
      {/* <Match></Match> */}
      {/* <Tournament></Tournament> */}
      {/* <Welcome></Welcome> */}
      {/* <Signup></Signup> */}
      {/* <Login></Login> */}
        {/* <Card msg={message} /> */}
      </ErrorBoundary>
    </div>
  );
}

export default App;
