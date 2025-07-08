import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PreMatchSetup = () => {
  const location = useLocation();
  const [teams, setTeams] = useState(null);
  const [matchId, setMatchId] = useState(null);

  useEffect(() => {
    const t = location.state || null;
    setTeams(t.teams);
    setMatchId(t.matchId);
  }, [location.state]);

  useEffect(() => {
    populateSelectTeam();
  }, [teams]);

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

    const tossWinner = document.getElementById("tosswonby").value;
    const decision = document.getElementById("decision").value;
    const onfield = document.getElementById("onfield").value;
    const third = document.getElementById("third").value;
    const tv = document.getElementById("tv").value;
    const r = document.getElementById("refree").value;

    const host = process.env.REACT_APP_HOST_URI;

    const reqOptions = {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tossWinner: `${tossWinner}`,
        decision: `${decision}`,
        onfield: `${onfield}`,
        third: `${third}`,
        tv: `${tv}`,
        r: `${r}`,
      }),
    };

    const response = await fetch(
      `${host}/api/cricscore/match/prematch/${matchId}`,
      reqOptions
    );
    const data = await response.json();
    alert(data.message);
    //now go to scoring interface
  };

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

          <div className="form-group">
            <input type="submit" className="submit" value="Save" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreMatchSetup;
