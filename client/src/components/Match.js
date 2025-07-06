import React, { useRef, useState, useEffect } from "react";
import "../css/match.css";
import Select from "react-select";
import CustomDateInput from "./CustomDateInput";
import MyTimePicker from "./TimePicker";
export const Match = (props) => {
  const host = "http://localhost:5000";

       const [loading, setLoading] = useState(true);
 const [progress, setProgress] = useState(0);

  const [TeamA, setTeamA] = useState(null);
  const [TeamB, setTeamB] = useState(null);

  const [TeamA_id, setTeamA_id] = useState(null);
  const [TeamB_id, setTeamB_id] = useState(null);

  const [Teams, setTeams] = useState(null);
  const [teamOpt, setTeamOptions] = useState(null);

  const [matchDate, setMatchDate] = useState(null);
  const [matchTime, setMatchTime] = useState(null);

  const [refresh, setRefresh] = useState(0);
  const [Data, setData] = useState(null);

  const [tournament_id, setTour_id] = useState(null);

  //to styling and editing <select> <option>
  const [selectedOption, setSelectedOption] = useState(null);

  const [options, setOptions] = useState(null);
  const [venues, setVenus] = useState(null);

  const [selectedVenue, setSelectedVenue] = useState(null);

  useEffect(() => {
                      setLoading(true);
       setProgress(20); // Start slow
    fetchTournament();
                    const  interval = setInterval(() => {
      setProgress(prev => (prev < 90 ? prev + 10 : prev));
    }, 200); // Fake loading forward

        setProgress(100);

                
              setTimeout(() => {
        setLoading(false);
        setProgress(0);
        clearInterval(interval);
      }, 400); 
  }, []); // only once on mount

  useEffect(() => {
    if (tournament_id) {
      fetchTeam();
    }
  }, [tournament_id]); // run when tournament_id changes

  //fetch table data
  const fetchTournament = async () => {
    const response = await fetch(`${host}/api/cricscore/tournament`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.data) {
      setData(result.data);
      const opts = result.data.map((t) => ({
        value: t.tournament_name,
        label: t.tournament_name,
        tour_id: t._id,
      }));
      const venue1 = result.data.map((t) => ({
        value: t.venue,
        label: t.venue,
      }));

      setOptions(opts);
      setVenus(venue1);
    } else {
      console.log("Tournament data  not get from backend:");
    }
    console.log(result.data);
  };
  const fetchTeam = async () => {
    const response = await fetch(
      `${host}/api/cricscore/tournament/${tournament_id}/teams`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (result.data) {
      setTeams(result.data);
      const opts = result.data.map((t) => ({
        value: t.teamName,
        label: t.teamName,
        id: t._id,
      }));

      setTeamOptions(opts);
    } else {
      console.log("Team data  not get from backend:");
    }
    console.log(result.data);
  };

  // function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const tournament_name = selectedOption?.value || "";
    const tournament_id1 = tournament_id;
    const teamA = TeamA?.value || "";
    var teamA_id = TeamA_id;
    const teamB = TeamB?.value || "";
    var teamB_id = TeamB_id;
    const match_date = matchDate;
    var match_time = matchTime;
    const venue = selectedVenue?.value || "";

    // Submit the form

    const response = await fetch(
      "http://localhost:5000/api/cricscore/match/creatematch",
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tournament_name: `${tournament_name}`,
          tournament_id: `${tournament_id1}`,
          teamA: `${teamA}`,
          teamB: `${teamB}`,
          teamA_id: `${teamA_id}`,
          teamB_id: `${teamB_id}`,
          match_date: `${match_date}`,
          match_time: `${match_time}`,
          venue: `${venue}`,
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();

      console.log("submitted data:" + data.match);

      alert(data.message);

      if (props.setRefresh) {
        props.setRefresh(props.refresh + 1);
      }
      //setting the data to null
      if (props.setEditedData) {
        props.setEditedData(null);
      }
      if (props.setisEdit) {
        props.setisEdit(false);
      }

      //setting all states to null after creating match
      setTeamA(null);
      setTeamB(null);
      setTeamA_id(null);
      setTeamB_id(null);
      setMatchDate(null);
      setMatchTime(null);
      setSelectedVenue(null);
      setSelectedOption(null);
      // navigate('/',{state:{user:data.user}});
    } else {
      console.log("Unable to create Match", response.status);
    }
  };

  return (
    <>
            {loading && (
  <div className="loading-bar-container">
    <div className="loading-bar-progress" style={{ width: `${progress}%` }}></div>
  </div>)}

      <div className="login" style={{ height: props.isEdit ? "auto" : "98vh" }}>
        <div className="form-container">
          <h2 style={{ textAlign: "center" }}>Create Match</h2>
          <form onSubmit={handleSubmit}>
            <div
              className="form-group"
              style={{ zIndex: "3", position: "relative", fontWeight: "500" }}
            >
              <Select
                options={options}
                value={selectedOption}
                onChange={(opt) => {
                  setSelectedOption(opt);
                  setTour_id(opt?.tour_id);
                }}
                isClearable
                placeholder="Tournament"
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#888",
                  }),
                }}
                required
              />
            </div>

            <div
              className="form-group"
              style={{
                display: "grid",
                gridTemplateColumns: "6fr 1fr 6fr",
                gap: "0.5rem",
              }}
            >
              <Select
                options={teamOpt}
                value={TeamA}
                onChange={(opt) => {
                  setTeamA(opt);
                  setTeamA_id(opt?.id);
                }}
                isClearable
                placeholder="TeamA"
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#888",
                  }),
                }}
                required
              />

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                vs
              </span>
              <Select
                options={teamOpt}
                value={TeamB}
                onChange={(opt) => {
                  setTeamB(opt);
                  setTeamB_id(opt?.id);
                }}
                isClearable
                placeholder="TeamB"
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#888",
                  }),
                }}
                required
              />
            </div>

            <div
              className="form-group"
              style={{
                display: "grid",
                gridTemplateColumns: "1.25fr 1fr",
                gap: "4.5rem",
              }}
            >
              <CustomDateInput
                start_date={matchDate}
                Setstart_date={setMatchDate}
                setMatchDate={setMatchDate}
                placeholder={"Match Date"}
              />
              <MyTimePicker
                match_time={matchTime}
                onChange={setMatchTime}
                placeholder={"Time"}
              />
            </div>

            <div
              className="form-group"
              style={{ zIndex: "3", position: "relative", fontWeight: "500" }}
            >
              <Select
                id="description"
                name="description"
                options={venues}
                value={selectedVenue}
                onChange={(opt) => setSelectedVenue(opt)}
                isClearable
                placeholder="Ground Name/Venue"
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#888",
                  }),
                }}
                required
              />
            </div>

            <div className="form-group" style={{ marginTop: "1rem" }}>
              <input type="submit" name="submit" value="Create Match" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
