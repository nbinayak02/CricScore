const Table = (props) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tournament Name</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Venue</th>
            <th scope="col">Location</th>
            <th scope="col">Format</th>
            <th scope="col">Organizers</th>
            <th scope="col" colSpan={3}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.tournament_name}</td>
                  <td>{new Date(item.start_date).toDateString()}</td>
                  <td>{new Date(item.end_date).toDateString()}</td>
                  <td>{item.venue}</td>
                  <td>{item.location}</td>
                  <td>{item.format}</td>
                  <td>{item.organizer || "-"}</td>
                  <td>
                  <button type="button" className="btn btn-primary">
                    View
                  </button>
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

export default Table;
