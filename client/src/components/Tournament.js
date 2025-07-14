import Table from "./Table";
import { EditTournamet, CreateTournament } from "./CreateTournament";
import { useState, useEffect, useRef } from "react";

export const Tournament = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const [refresh, setRefresh] = useState(0);
  const [data, setData] = useState([]);
  const [isEdit, setisEdit] = useState(false);
  const host = "http://localhost:5000";
  const [editedData, setEditedData] = useState([]);
  //fetch when first page loads + when refresh is set
  useEffect(() => {
    setLoading(true);
    setProgress(20); // Start slow
    fetchData();
  }, [refresh]);

  const modalref = useRef(null);

  const openModal = () => {
    setisEdit(true);
    modalref.current.click();
  };

  //fetch table data
  const fetchData = async () => {
    setProgress(40);
    const response = await fetch(`${host}/api/cricscore/tournament`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 200); // Fake loading forward

    const result = await response.json();

    setData(result.data);
    setProgress(100);
    setTimeout(() => {
      setLoading(false);
      setProgress(0);
      clearInterval(interval);
    }, 400);
  };

  const handleClose = () => {
    setisEdit(false);
    setEditedData(null);
  };

  return (
    <>
      {loading && (
        <div className="loading-bar-container">
          <div
            className="loading-bar-progress"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      <div className="tournament-container">
        <button
          id="create_tournament"
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          ref={modalref}
        >
          Create Tournament
        </button>

        <Table
          openModal={openModal}
          setEditedData={setEditedData}
          setisEdit={setisEdit}
          data={data}
          refresh={refresh}
          setRefresh={setRefresh}
        />

        {/* modal */}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Create Tournament
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                {/* if form === true show CreateTournament */}
                {!isEdit ? (
                  <CreateTournament
                    data={data}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                ) : (
                  <EditTournamet
                    editedData={editedData}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
