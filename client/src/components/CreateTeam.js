const CreateTeam = (props) => {
  const host = "http://localhost:5000";
  const tourId = props.id;
  const handleSubmit = async (e) => {

    e.preventDefault();

    const teamName = document.getElementById("teamName").value;
    const squad = document.getElementById("squad").value;
    const teamCoach = document.getElementById("teamCoach").value;

    if(teamName == "" || squad == "" || teamCoach == ""){
      alert("All fields are required");
      return false;
    }

    const response = await fetch(`${host}/api/cricscore/tournament/${tourId}/teams`,{
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        teamName: `${teamName}`,
        squad: `${squad}`,
        teamCoach: `${teamCoach}`
      }),
    });

    const data = await response.json();
    props.setRefresh(props.refresh + 1)
    alert(data.message);
  };

  return (
    <>
      <div className="login">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" id="teamName" placeholder="Team Name" />
            </div>
            <div className="form-group">
              <textarea
                id="squad"
                placeholder="Enter Player's name - seperated by comma(,)"
                cols={50}
                rows={5}
              ></textarea>
            </div>
            <div className="form-group">
              <input type="text" id="teamCoach" placeholder="Team Coach" />
            </div>

            <div className="form-group">
              <input type="submit" name="submit" value="Create Team" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTeam;
