import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TournamentCard from "./TournamentCard";
import CreateTeam from "./CreateTeam";
import TeamTable from "./TeamTable";

const SetupTournament = () => {
  const params = useParams();
  const tourId = params.id;
  const host = "http://localhost:5000";
  const [refresh, setRefresh] = useState(0);
  const [tourData, setTourData] = useState([]);
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    fetchTourData();
  }, []);
  
  //for refetching data when new data is inserted
  useEffect(()=>{
    fetchTeamData();
  }, [refresh]);

  const fetchTourData = async () => {
    const response = await fetch(`${host}/api/cricscore/tournament/${tourId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    setTourData(result.data);
  };

  const fetchTeamData = async () => {
    const response = await fetch(`${host}/api/cricscore/tournament/${tourId}/teams`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    setTeamData(result.data);
  };

  return (
    <div className="setup">
      <TournamentCard tourData={tourData} />
      <button
        type="button"
        className="btn btn-primary mt-4"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Create Team
      </button>

      {/* modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Create Team
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <CreateTeam id={tourId}  refresh={refresh} setRefresh={setRefresh}/>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <TeamTable data={teamData}/>
    </div>
  );
};

export default SetupTournament;
