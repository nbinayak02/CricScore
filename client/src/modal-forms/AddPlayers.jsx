import React, { useState } from "react";

const AddPlayers = (props) => {
  const [players, setPlayers] = useState(
    Array.from({ length: 15 }, () => ({ name: "", role: "", isCaptain: false }))
  );
  const handleChange = (index, field, value) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], [field]: value };
    setPlayers(newPlayers);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let captainCount = 0;
    let nameEmptyCount = 0;
    let roleEmptyCount = 0;

    //validate
    players.map((player) => {
      if (!player.name.trim()) {
        nameEmptyCount++;
      }

      if (!player.role.trim()) {
        roleEmptyCount++;
      }

      if (player.isCaptain) {
        captainCount++;
      }
    });

    if (nameEmptyCount > 0) {
      alert(`${nameEmptyCount} players name is empty. Please fill all of them`);
      return false;
    }
    if (roleEmptyCount > 0) {
      alert(
        `${roleEmptyCount} players role is not selected. Please select role for all of them`
      );
      return false;
    }
    if (captainCount != 1) {
      alert("Please select one of the player as a captain");
      return false;
    }

    const reqOptions = {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        players: players,
        tourId: props.tourId,
        teamId: props.teamId,
      }),
    };

    const host = process.env.REACT_APP_HOST_URI;

    try {
      const response = await fetch(
        `${host}/api/cricscore/players/`,
        reqOptions
      );
      const r = await response.json();
      alert(r.message);
      setPlayers(
        Array.from({ length: 15 }, () => ({
          name: "",
          role: "",
          isCaptain: false,
        }))
      );
      props.setRefresh(props.refresh + 1);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="login" style={{ height: "auto" }}>
        <div className="form-container">
          <h2 style={{ textAlign: "center" }}>Add Players</h2>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "0.5rem",
              }}
            >
              {players.map((player, index) => (
                <React.Fragment key={index}>
                  <div className="form-group">
                    <input
                      type="text"
                      id={`player${index}`}
                      placeholder={`Player ${index + 1}`}
                      value={player.name}
                      onChange={(e) =>
                        handleChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <select
                      value={player.role}
                      id={`role${index}`}
                      onChange={(e) =>
                        handleChange(index, "role", e.target.value)
                      }
                    >
                      <option value="">-- Select a role --</option>
                      <option value="batsman">Batsman</option>
                      <option value="bowler">Bowler</option>
                      <option value="wicket_keeper">Wicket-Keeper</option>
                      <option value="wk_batsman">Wicket-Keeper Batsman</option>
                      <option value="all_rounder_batting">
                        All-Rounder (Batting)
                      </option>
                      <option value="all_rounder_bowling">
                        All-Rounder (Bowling)
                      </option>
                    </select>
                  </div>

                  <div className="form-group d-flex gap-2">
                    <input
                      type="radio"
                      name="captain"
                      id={`isCaptain${index}`}
                      checked={player.isCaptain}
                      onChange={() =>
                        handleChange(index, "isCaptain", !player.isCaptain)
                      }
                    />
                    <label htmlFor={`isCaptain${index}`}>Is Captain?</label>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="form-group" style={{ marginTop: "1rem" }}>
              <input
                type="submit"
                name="submit"
                value="Add Players"
                style={{ backgroundColor: "#0d6efd" }}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPlayers;
