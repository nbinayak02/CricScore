import React, { useRef, useState } from "react";
import "../css/tournament.css";
import CustomDateInput from "./CustomDateInput";
import MapPicker from "./MapPicker";

const CreateTournament = (props) => {
  const host = "http://localhost:5000";

  const Mapref = useRef(null);
  const [place, setplace] = useState("");
  const [showMap, setShowMap] = useState(false);

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
              <CustomDateInput id={"start_date"} placeholder={"Start Date"} />
              <CustomDateInput id={"end_date"} placeholder={"End"} />
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

export default CreateTournament;
