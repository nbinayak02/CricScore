import { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import "../css/matchtable.css";

const MatchTable = (props) => {
  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState(null);

  const host = "http://localhost:5000";

  const navigate = useNavigate();

  //sending teams to prematch
  const handleLive = (item) => {
    navigate("/prematch", { state: {teams: [item.teamA, item.teamB], matchId: item._id} });
  };

  //function to format time
  const formatTimeTo12Hour = (timeStr) => {
    if (!timeStr || typeof timeStr !== "string") return "";

    const [hourStr, minuteStr] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // convert 0 -> 12
    return `${hour}:${minuteStr} ${ampm}`;
  };

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure you want to delete?");

    if (isConfirm) {
      const response = await fetch(`${host}/api/cricscore/match/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        }
      });

      if (response.ok) {
        const data = await response.json();

        alert(data.message);
        //refresh table
        props.setRefresh(props.refresh + 1);
      }
    }
  };

  const handleEdit = async (item) => {
    //setting boolean true after edit clicked
    props.setisEdit(true);

    //passing data value for edit modal
    props.setEditedData(item);

    // setEditId(item._id);
    // setEditedData({ ...item });
    // Clone the data for editing
    // Call update API or parent method here
    props.openModal();
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tournament Name</th>
            <th scope="col">Team A</th>
            <th scope="col">Team B</th>
            <th scope="col">Match Date</th>
            <th scope="col">Match Time</th>
            <th scope="col">Venue</th>
            <th scope="col" colSpan={3}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.tournament_name}</td>
                  <td>{item.teamA}</td>
                  <td>{item.teamB}</td>
                  <td>{new Date(item.match_date).toDateString()}</td>
                  <td>{formatTimeTo12Hour(item.match_time)}</td>
                  <td>{item.venue}</td>
                  <td>
                    <button
                      id="live_btn"
                      style={{ width: "max-content !important" }}
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleLive(item)}
                    >
                      Start Match
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(item)}
                      className="btn btn-success"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default MatchTable;
