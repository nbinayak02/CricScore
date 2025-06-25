const TournamentCard = (props) => {
    return (
         <div className="">
        <div className="card">
          <div className="card-header d-flex flex-row justify-content-between">
            <span className="h3">{props.tourData.tournament_name} </span>
            <strong className="h6">
              Last Update: {new Date(props.tourData.updatedAt).toDateString()}
            </strong>
          </div>
          <div className="card-body d-flex justify-content-evenly flex-wrap">
            <div>
              <h5 className="card-title">
                From: {new Date(props.tourData.start_date).toDateString()}
              </h5>
              <h5 className="card-title">
                To: {new Date(props.tourData.end_date).toDateString()}
              </h5>
              <h5 className="card-title">Venue: {props.tourData.venue}</h5>
              <h5 className="card-title">Location: {props.tourData.location}</h5>
            </div>
            <div>
              <h5 className="card-title">
                Tournament Format: {props.tourData.format} overs
              </h5>
              <h5 className="card-title">Organizers: {props.tourData.organizer}</h5>
              <h5 className="card-title">
                Created By: {props.tourData.createdBy?.fullName}
              </h5>
              <h5 className="card-title">
                Created At: {new Date(props.tourData.createdAt).toDateString()}
              </h5>
            </div>
          </div>
        </div>

      
    </div>
    );
}

export default TournamentCard;