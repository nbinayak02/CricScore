import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TournamentCard from "./TournamentCard";
import CreateTeam from "./CreateTeam";
import TeamTable from "./TeamTable";
import { EditTeam } from"./CreateTeam.js";
import { useRef } from "react";

const SetupTournament = () => {

  //to run the model when editbutton is clicked
    const modalRef = useRef();

     const [loading, setLoading] = useState(true);
 const [progress, setProgress] = useState(0);
    
    const params = useParams();
    const tourId = params.id;
    const host = "http://localhost:5000";
    const [refresh, setRefresh] = useState(0);
    const [tourData, setTourData] = useState([]);
    const [teamData, setTeamData] = useState([]);
    const [isEdit,setIsEdit]=useState(false);
    const[EditTeamId,setEditTeamId]=useState(null);
    const[Editteam,setEditTeam]=useState(null);

    var interval=null;

    
    const openModal = () => {
      setIsEdit(true);
  modalRef.current.click();
};


  useEffect(() => {
        setLoading(true);
       setProgress(20); // Start slow

            interval = setInterval(() => {
      setProgress(prev => (prev < 90 ? prev + 10 : prev));
    }, 200); // Fake loading forward

    fetchTourData();
  }, [refresh]);
  
  //for refetching data when new data is inserted
  useEffect(()=>{
    fetchTeamData();
  }, [refresh]);


  //to handle cancel button click
  const handleModalClose = () => {
  setIsEdit(false);
  setEditTeam(null);
  setEditTeamId(null);
};
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
    setProgress(100);

              setTimeout(() => {
        setLoading(false);
        setProgress(0);
        clearInterval(interval);
      }, 400); 
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

    <>

    {loading && (
  <div className="loading-bar-container">
    <div className="loading-bar-progress" style={{ width: `${progress}%` }}></div>
  </div>
)}
    <div className="setup">
      <TournamentCard tourData={tourData} />
      <button
        type="button"
        className="btn btn-primary mt-4"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        ref={modalRef}
      >
        Create Team
      </button>

      {/* modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
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
                onClick={handleModalClose}
              ></button>
            </div>
            <div className="modal-body">
              {!isEdit?
                <CreateTeam id={tourId}  refresh={refresh} setRefresh={setRefresh}/>
                :
                <EditTeam setEditTeam={setEditTeam} setEditTeamId={setEditTeamId}  setIsEdit={setIsEdit} EditTeam={Editteam}  id={EditTeamId} refresh={refresh} setRefresh={setRefresh}/>
              }

            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleModalClose}
                >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <TeamTable openModal={openModal} setIsEdit={setIsEdit} setEditTeam={setEditTeam} setEditTeamId={setEditTeamId} refresh={refresh} setRefresh={setRefresh} data={teamData}/>
    </div>
                </>
  );
};

export default SetupTournament;
