import React, { useRef, useState } from "react";
import "../css/tournament.css";
import CustomDateInput from "./CustomDateInput";
import MapPicker from "./MapPicker";

export const CreateTournament = (props) => {
  const host = "http://localhost:5000";

  const [place, setplace] = useState("");
  const Mapref = useRef(null);
  const [showMap, setShowMap] = useState(false);

   const [start_date,Setstart_date]=useState(null);
  const [end_date,Setend_date]=useState(null);



  //function to get address using latitude and longitude
  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();
      // console.log('Place name:', data.display_name);

      setplace(data.display_name);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  //function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    var tournament_name = document.getElementById("name").value;
    var start_date = document.getElementById("start_date").value;
    var end_date = document.getElementById("end_date").value;
    var locFromMap = document.getElementById("locmap").value;
    var venue = document.getElementById("venue").value;
    var location = document.getElementById("location").value;
    var format = document.getElementById("format").value;
    var organizer = document.getElementById("organizer").value;
    var description = document.getElementById("description").value;

    // if (place === "") {
    //   alert("Please select a location.");
    //   return;
    // }

    const response = await fetch(`${host}/api/cricscore/tournament/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tournament_name: `${tournament_name}`,
        start_date: `${start_date}`,
        end_date: `${end_date}`,
        venue: `${venue}`,
        location: `${location}`,
        locFromMap: `${locFromMap}`,
        format: `${format}`,
        organizer: `${organizer}`,
        description: `${description}`,
      }),
    });

    const data = await response.json();
    alert(data.message);

    //refresh table
    props.setRefresh(props.refresh + 1);
  };

  return (
    <>
      <div className="login" style={{ height: "auto" }}>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                required
                type="text"
                id="name"
                name="name"
                placeholder="Tournament Name"
              />
            </div>

            <div
              className="form-group"
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "0.5rem",
              }}
            >
              <CustomDateInput Setstart_date={Setstart_date} start_date={start_date}  id={"start_date"} placeholder={"Start Date"} />
              <CustomDateInput Setstart_date={Setend_date} Setend_date={end_date}  id={"end_date"} placeholder={"End"} />
            </div>

            <div className="form-group">
              <input
                required
                type="text"
                id="venue"
                name="venue"
                placeholder="Venue (Ground or Stadium name)"
              />
            </div>

            <div
              className="form-group"
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "0.5rem",
              }}
            >
              <input type="text" id="location" placeholder="Location" />
              <input
                type="text"
                id="locmap"
                readOnly
                value={place}
                name="location"
                placeholder="or Pick from map"
                onFocus={() => setShowMap(true)}
              />
            </div>
            {showMap && (
              <MapPicker
                ref={Mapref}
                onSelect={(latlng) => {
                  reverseGeocode(latlng.lat, latlng.lng);
                }}
              />
            )}

            <div className="form-group">
              <input
                required
                type="text"
                id="format"
                name="format"
                placeholder="Tournament Format (e.g. 20 for T20, 50 for OD)"
              />
            </div>

            <div className="form-group">
              <input
                required
                type="text"
                id="organizer"
                name="organizer"
                placeholder="Tournament Organizers"
              />
            </div>

            <div className="form-group">
              <textarea
                id="description"
                name="description"
                placeholder="Description(Optional)"
              />
            </div>

            <div className="form-group">
              <input type="submit" name="submit" value="Create Tournment" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

 export const EditTournamet=(props)=>{

  console.log("generation props:"+props.editedData);
  const [tournament_name,SetTournament_name]=useState(props.editedData.tournament_name);
  const [start_date,Setstart_date]=useState(props.editedData.start_date);
  const [end_date,Setend_date]=useState(props.editedData.end_date);
  const [venue,Setvenue]=useState(props.editedData.venue);
  const [location,Setlocation]=useState(props.editedData.location);
  const [locFromMap,SetlocFromMap]=useState(props.editedData.locFromMap);
  const [format,Setformat]=useState(props.editedData.format);
  const [organizer,Setorganizer]=useState(props.editedData.organizer);
  const [description,Setdescription]=useState(props.editedData.description);

  const host = "http://localhost:5000";


  const Mapref = useRef(null);
  const [showMap, setShowMap] = useState(false);
  //function to get address using latitude and longitude
  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();
      // console.log('Place name:', data.display_name);

      SetlocFromMap(data.display_name);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };


  const handleSave = async (e) => {
    // Call update API or parent method here

    e.preventDefault();

    var _id = props.editedData._id;
    var tournament_name1 = tournament_name;
    var start_date1 = start_date;
    var end_date1 = end_date;
    var locFromMap1 = locFromMap;
    var venue1 = venue;
    var location1 = location;
    var format1= format;
    var organizer1 = organizer;
    var description1 = description;

    const response = await fetch(`${host}/api/cricscore/tournament/update`, {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: `${_id}`,
        tournament_name: `${tournament_name1}`,
        start_date: `${start_date1}`,
        end_date: `${end_date1}`,
        venue: `${venue1}`,
        location: `${location1}`,
        locFromMap: `${locFromMap1}`,
        format: `${format1}`,
        organizer: `${organizer1}`,
        description: `${description1}`,
      }),
    });

    const data = await response.json();
    alert(data.message);

    //refresh table
    props.setRefresh(props.refresh + 1);
  };

  return (
    <>
      <div className="login" style={{ height: "auto" }}>
        <div className="form-container">
          <form onSubmit={handleSave}>
            <div className="form-group">
              <input
                required
                type="text"
                id="name"
                name="name"
                value={tournament_name}
                onChange={(e)=>{SetTournament_name(e.target.value)}}
                placeholder="Tournament Name"
              />
            </div>

            <div
              className="form-group"
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "0.5rem",
              }}
            >
              <CustomDateInput Setstart_date={Setstart_date} start_date={start_date} id={"start_date"} placeholder={"Start Date"} />
              <CustomDateInput Setstart_date={Setend_date} start_date={end_date} id={"end_date"} placeholder={"End"} />
            </div>

            <div className="form-group">
              <input
                required
                type="text"
                id="venue"
                name="venue"
                value={venue}
                onChange={(e)=>{Setvenue(e.target.value)}}
                placeholder="Venue (Ground or Stadium name)"
              />
            </div>

            <div
              className="form-group"
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "0.5rem",
              }}
            >
              <input type="text" id="location" placeholder="Location" value={location} onChange={(e)=>{Setlocation(e.target.value)}} />
              <input
                type="text"
                id="locmap"
                readOnly
                value={locFromMap}
                name="location"
                placeholder="or Pick from map"
                onFocus={() => setShowMap(true)}
              />
            </div>
            {showMap && (
              <MapPicker
                ref={Mapref}
                onSelect={(latlng) => {
                  reverseGeocode(latlng.lat, latlng.lng);
                }}
              />
            )}

            <div className="form-group">
              <input
                required
                type="text"
                id="format"
                name="format"
                value={format}
                onChange={(e)=>{Setformat(e.target.value)}}
                placeholder="Tournament Format (e.g. 20 for T20, 50 for OD)"
              />
            </div>

            <div className="form-group">
              <input
                required
                type="text"
                id="organizer"
                name="organizer"
                value={organizer}
                onChange={(e)=>{Setorganizer(e.target.value)}}
                placeholder="Tournament Organizers"
              />
            </div>

            <div className="form-group">
              <textarea
              
                id="description"
                name="description"
                value={description}
                onChange={(e)=>{Setdescription(e.target.value)}}
                placeholder="Description(Optional)"
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btn btn-primary" name="submit" value="Update Tournment" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
  

export default CreateTournament;
