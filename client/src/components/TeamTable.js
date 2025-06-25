import { useNavigate } from "react-router-dom";

const TeamTable = (props) => {
  const navigate = useNavigate();

  const handleNavigation = (tourId) => {
    navigate(`/tournament/${tourId}`);
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Team Name</th>
            <th scope="col">Squad</th>
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
                  <td>{item.squad}</td>
                  <td>{item.teamCoach}</td>
                  <td>
                    {/* <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleNavigation(item._id)}
                    >
                      Setup
                    </button> */}
                  </td>
                  <td>
                    <button type="button" className="btn btn-success">
                      Edit
                    </button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger">
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

export default TeamTable;
