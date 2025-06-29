import React, { useRef, useState, useEffect } from "react";
import "../css/match.css";
import Select from "react-select";
import CustomDateInput from "./CustomDateInput";
import MyTimePicker from "./TimePicker";
export const Match = () => {
  const host = "http://localhost:5000";

  const [TeamA, setTeamA] = useState(null);
  const [TeamB, setTeamB] = useState(null);

  const [TeamA_id, setTeamA_id] = useState(null);
  const [TeamB_id, setTeamB_id] = useState(null);

  const[Teams,setTeams]=useState(null);
  const[teamOpt,setTeamOptions]=useState(null);

  const [matchDate, setMatchDate] = useState(null);
  const [matchTime, setMatchTime] = useState(null);

  const [refresh, setRefresh] = useState(0);
  const [Data, setData] = useState(null);

  const [tournament_id, setTour_id] = useState('6858f689885ec8b7a18a791e');

  //to styling and editing <select> <option>
  const [selectedOption, setSelectedOption] = useState(null);

  const [options, setOptions] = useState(null);
  const [venues, setVenus] = useState(null);

  const [selectedVenue, setSelectedVenue] = useState(null);

  // const venues = [
  //   { value: "Biratnagar", label: "Biratnagar cricket Stadium" },
  //   { value: "Birtamod", label: "Birtamod cricket Stadium" },
  // ];

  useEffect(() => {
    fetchTournament();
    //to get tournament name from api and store to options
if(tournament_id){
fetchTeam();
}
  }, [tournament_id]);

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
    const response = await fetch(`${host}/api/cricscore/tournament/${tournament_id}/teams`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.data) {
      setTeams(result.data);
      const opts = result.data.map((t) => ({
        value: t.teamName,
        label: t.teamName,
        id:t._id,
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

    const tournament_name = selectedOption;
    var teamA = TeamA;
    var teamA_id=TeamA_id;
    var teamB_id=TeamB_id;
    var teamB = TeamB;
    const match_date = matchDate;
    var match_time = matchTime;
    const venue = selectedVenue;

    // Submit the form

    const response = await fetch("http://localhost:5000/api/cricscore/match/creatematch", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tournament_name: `${tournament_name}`,
        teamA: `${teamA}`,
        teamB: `${teamB}`,
        teamA_id:`${teamA_id}`,
        teamB_id:`${teamB_id}`,
        match_date: `${match_date}`,
        match_time: `${match_time}`,
        venue: `${venue}`,
      }),
    });
    if (response.ok) {
      const data = await response.json();

      console.log("submitted data:" + data.match);

      alert(data.message);
      // navigate('/',{state:{user:data.user}});
    } else {
      console.log("Unable to create Match", response.status);
    }
  };


  return (
    <>
      <div className="login" style={{ height: "98vh" }}>
        <div className="form-container">
          <h2 style={{ textAlign: "center" }}>Create Match</h2>
          <form onSubmit={handleSubmit}>
            <div
              className="form-group"
              style={{ zIndex: "3", position: "relative", fontWeight: "500" }}
            >
              <Select
                id="name"
                name="name"
                options={options ? options : null}
                value={
                  (options &&
                    options.find((opt) => opt.value === selectedOption)) ||
                  null
                }
                onChange={(opt) => {
                  setSelectedOption(opt?.value);
                   setTour_id(opt?.tour_id);
                }}
                isClearable
                placeholder="Tournament Name"
                styles={{
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
                id="teamA"
                className="team"
                options={teamOpt ? teamOpt : null}
                value={
                  (teamOpt &&
                    teamOpt.find((opt) => opt.value === TeamA)) ||
                  null
                }
                onChange={(opt) => {setTeamA(opt?.value);
                  setTeamA_id(opt?.id);
                  console.log("id:"+opt?.id);
                }}
                isClearable
                placeholder="Team A"
                styles={{
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
                id="teamB"
                className="team"
                options={teamOpt ? teamOpt : null}
                value={
                  (teamOpt &&
                    teamOpt.find((opt) => opt.value === TeamB)) ||
                  null
                }
                onChange={(opt) => {setTeamB(opt?.value);
                  setTeamB_id(opt?.id);
                  console.log("id:"+opt?.id);
                }}
                isClearable
                placeholder="Team B"
                styles={{
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
              <CustomDateInput setMatchDate={setMatchDate} placeholder={"Match Date"} />
              <MyTimePicker  onChange={setMatchTime} placeholder={"Time"} />
            </div>

            <div
              className="form-group"
              style={{ zIndex: "3", position: "relative", fontWeight: "500" }}
            >
              <Select
                id="description"
                name="description"
                options={venues ? venues : null}
                value={
                  (venues &&
                    venues.find((opt) => opt.value === selectedVenue)) ||
                  null
                }
                onChange={(opt) => setSelectedVenue(opt?.value)}
                isClearable
                placeholder="Ground Name/Venue"
                styles={{
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
