import Table from "./Table";
import CreateTournament from "./CreateTournament";
import { useState, useEffect } from "react";

export const Tournament = () => {
  const [form, setForm] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [data, setData] = useState([]);
  const host = "http://localhost:5000";

  //fetch when first page loads + when refresh is set
  useEffect(() => {
    fetchData();
  }, [refresh]);

  //fetch table data
  const fetchData = async () => {
    const response = await fetch(`${host}/api/cricscore/tournament`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    setData(result.data);
    console.log("Fetched"+result.data[0]);
  };

  return (
    <div className="tournament-container">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Create Tournament
      </button>

      <Table data={data} refresh={refresh} setRefresh={setRefresh} />

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
              ></button>
            </div>
            <div className="modal-body">
              {/* if form === true show CreateTournament */}
              {<CreateTournament refresh={refresh} setRefresh={setRefresh} />}
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
    </div>
  );
};
