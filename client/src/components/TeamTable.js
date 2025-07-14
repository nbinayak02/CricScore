import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const TeamTable = (props) => {
  const { id } = useParams();
  const host = "http://localhost:5000";
  const navigate = useNavigate();

  const handleEdit = (item) => {
    props.setEditTeamId(item._id);
    props.setEditTeam(item);
    props.setIsEdit(true);

    //to open model on edit click
    props.openModal();

    //invoke the component
  };

  const handleDelete = async (id) => {
    var isConfirm = window.confirm("Are you Sure to Delete?");
    if (isConfirm === true) {
      const response = await fetch(
        `${host}/api/cricscore/tournament/${id}/delete`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        alert(data.message);
        //refresh table
        props.setRefresh(props.refresh + 1);
      }
    }
  };

  const handleNavigation = (teamId) => {
    navigate(`/players/${id}/${teamId}`);
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Team Name</th>
            <th scope="col">Coach</th>
            <th scope="col" colSpan={3}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.map((item, index) => {
              return (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{item.teamName}</td>
                  <td>{item.teamCoach}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleNavigation(item._id)}
                    >
                      Assign Players
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        handleEdit(item);
                      }}
                      className="btn btn-success"
                    >
                      Edit Team
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                      className="btn btn-danger"
                    >
                      Delete Team
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

export default TeamTable;
