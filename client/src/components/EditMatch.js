import React, { useRef, useState, useEffect } from "react";
import Select from "react-select";
import "../css/tournament.css";
import CustomDateInput from "./CustomDateInput";
import MyTimePicker from "./TimePicker";

export const EditMatch = (props) => {
  const host = "http://localhost:5000";

  //logic to select the differnet values when editting
  const tournamentInit = useRef(false);
  const venueInit = useRef(false);
  const teamsInit = useRef(false);

  const [tournament_id, setTour_id] = useState(null);
  const [matchId, SetMatchId] = useState(null);
  const [tournament_name, SetTournament_name] = useState("");
  const [teamA, setteamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [teamA_id, setteamA_id] = useState("");
  const [teamB_id, setteamB_id] = useState("");
  const [match_date, setmatch_date] = useState("");
  const [match_time, setmatch_time] = useState("");
  const [venue, setvenue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [options, setOptions] = useState(null);
  const [venues, setVenus] = useState(null);
  const [Teams, setTeams] = useState(null);
  const [teamOpt, setTeamOptions] = useState(null);
  const [Data, setData] = useState(null);

  useEffect(() => {
    const ed = props.editedData;
    if (ed) {
      SetMatchId(ed._id);
      SetTournament_name(ed.tournament_name);
      setteamA(ed.teamA);
      setTeamB(ed.teamB);
      setteamA_id(ed.teamA_id);
      setteamB_id(ed.teamB_id);
      setmatch_date(ed.match_date);
      setmatch_time(ed.match_time);
      setvenue(ed.venue);
      setSelectedOption(ed.tournament_name);
      setSelectedVenue(ed.venue);
      setTour_id(ed.tournament_id);
    }
  }, [props.editedData]);

  useEffect(() => {
    if (tournament_id) {
      fetchTeam();
    }
  }, [tournament_id]);

  useEffect(() => {
    if (!tournamentInit.current && options && props.editedData) {
      const selected = options.find(
        (opt) => opt.value === props.editedData.tournament_name
      );
      if (selected) {
        setSelectedOption(selected);
        setTour_id(selected.tour_id);
        tournamentInit.current = true;
      }
    }
  }, [options, props.editedData]);

  useEffect(() => {
    fetchTournament();
    //to get tournament name from api and store to options
    if (tournament_id) {
      fetchTeam();
    }
  }, [tournament_id]);

  useEffect(() => {
    if (!venueInit.current && venues && props.editedData?.venue) {
      const selected = venues.find((v) => v.value === props.editedData.venue);
      if (selected) {
        setSelectedVenue(selected.value);
        venueInit.current = true;
      }
    }
  }, [venues, props.editedData]);

  useEffect(() => {
    if (!teamsInit.current && teamOpt && props.editedData) {
      const a = teamOpt.find((t) => t.value === props.editedData.teamA);
      const b = teamOpt.find((t) => t.value === props.editedData.teamB);

      if (a) {
        setteamA(a); // Full object
        setteamA_id(a.id);
      }

      if (b) {
        setTeamB(b); // Full object
        setteamB_id(b.id);
      }

      if (a || b) {
        teamsInit.current = true;
      }
    }
  }, [teamOpt, props.editedData]);

  //to reset the flag
  useEffect(() => {
    tournamentInit.current = false;
    venueInit.current = false;
    teamsInit.current = false;
  }, [props.editedData]);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tournament_name1 = selectedOption?.value || "";
    const tournament_id1 = tournament_id;
    const teamA1 = teamA?.value || "";
    const teamA_id1 = teamA?.id || "";
    const teamB1 = teamB?.value || "";
    const teamB_id1 = teamB?.id || "";
    const match_date1 = match_date;
    const match_time1 = match_time;
    const venue1 = selectedVenue || "";
    const host = process.env.REACT_APP_HOST_URI;
    const response = await fetch(`${host}/api/cricscore/match/${matchId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: matchId,
        tournament_name: tournament_name1,
        tournament_id: tournament_id1,
        teamA: teamA1,
        teamB: teamB1,
        teamA_id: teamA_id1,
        teamB_id: teamB_id1,
        match_date: match_date1,
        match_time: match_time1,
        venue: venue1,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("updated data:", data.match);
      props.setRefresh(props.refresh + 1);
      alert(data.message);
    } else {
      console.log("Unable to edit Match", response.status);
    }
  };

  return (
    <>
      <div className="login" style={{ height: "auto" }}>
        <div className="form-container">
          <h2 style={{ textAlign: "center" }}>Update Fixture</h2>
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
                  SetTournament_name(opt?.value);
                  setTour_id(opt?.tour_id);
                }}
                placeholder="Tournament Name"
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              />
              {/* <Select
                id="name"
                name="name"
                options={options ? options : null}
                value={
                  (options &&
                    options.find((opt) => {
                        if(opt.value === selectedOption){setTour_id(opt?.tour_id)}})) ||
                  null
                }
                onChange={(opt) => {
                  setSelectedOption(opt?.value);
                  SetTournament_name(opt?.value);
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
              /> */}
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
                value={teamA}
                onChange={(opt) => {
                  setteamA(opt);
                  setteamA_id(opt?.id);
                }}
                placeholder="Team A"
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
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
                value={teamB}
                onChange={(opt) => {
                  setTeamB(opt);
                  setteamB_id(opt?.id);
                }}
                placeholder="Team B"
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
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
                Setstart_date={setmatch_date}
                start_date={match_date}
                placeholder={"Match Date"}
              />
              <MyTimePicker
                match_time={match_time}
                onChange={setmatch_time}
                placeholder={"Time"}
              />
            </div>

            <div
              className="form-group"
              style={{ zIndex: "3", position: "relative", fontWeight: "500" }}
            >
              <Select
                options={venues}
                value={
                  venues?.find((opt) => opt.value === selectedVenue) || null
                }
                onChange={(opt) => setSelectedVenue(opt?.value)}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              />
            </div>

            <div className="form-group" style={{ marginTop: "1rem" }}>
              <input
                type="submit"
                name="submit"
                value="Update Fixture"
                style={{ backgroundColor: "#0d6efd" }}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditMatch;
