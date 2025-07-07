import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PreMatchSetup = async () => {
  //get tournament id from previous page
  const location = useLocation();
  const [teams, setTeams] = useState(null);

  useEffect(() => {
    const teams = location.state || null;
    setTeams(teams);
  }, [location.state]);

  useEffect(() => {
    populateSelectTeam();
  }, []);

  const populateSelectTeam = () => {
    if (teams != null) {
      const select = document.getElementById("tosswonby");
      teams.forEach((team) => {
        const option = document.createElement("option");
        option.value = team;
        option.innerText = team;
        select.append(option);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tossWinner = document.getElementById("tosswonby");
    const decision = document.getElementById("decision");
    const onfield = document.getElementById("onfield");
    const third = document.getElementById("third");
    const tv = document.getElementById("tv");
    const r = document.getElementById("refree");

    const host = process.env.REACT_APP_HOST_URI;

    const reqOptions = {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type":"application/json"
      }
    }
  }

  const response = await fetch(`${host}/api/cricscore/`)


  return (
    <div className="tournament-container">
      <div className="form-container">
        <h2 style={{ textAlign: "center" }}>Pre-Match Setup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="tosswonby">Toss won by:</label>
            <select id="tosswonby"></select>
          </div>

          <div className="form-group">
            <label htmlFor="decision">Choose to:</label>
            <select id="decision">
              <option value="bat">Batting</option>
              <option value="ball">Bowling</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="onfield">OnField Umpires</label>
            <input
              type="text"
              id="onfield"
              placeholder="On Fields umpire names seperated by comma (,)"
            />
          </div>
          <div className="form-group">
            <label htmlFor="third">Third Umpire</label>
            <input type="text" id="third" />
          </div>
          <div className="form-group">
            <label htmlFor="tv">T.V. Umpire</label>
            <input type="text" id="tv" />
          </div>

          <div className="form-group">
            <label htmlFor="refree">Match Refree</label>
            <input type="text" id="refree" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreMatchSetup;
