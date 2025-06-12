import React, { useRef, useState } from "react";
import'../css/tournament.css';
import CustomDateInput from "./CustomDateInput";
import MapPicker from './MapPicker';
export const Tournament=()=>{
  

  const Mapref=useRef(null);
  const [place,setplace]=useState('');
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
      console.error('Error fetching location:', error);
    }
  };

  // console.log(reverseGeocode(27.7172, 85.3240)); // Kathmandu



  //function to handle submit 
  const handleSubmit = (e) => {
  e.preventDefault();
  if (place==='') {
    alert("Please select a location.");
    return;
  }
  // Submit the form
};

  return (

<>

<div className="login" style={{height: '98vh'}}>
        <div className="form-container">
            <h2 style={{textAlign:'center'}}>Create Tournment</h2>
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <input required type="text" id="name" name="name" placeholder="Tournament Name "/>
                </div>


                <div className="form-group" style={{display:'grid',gridTemplateColumns: '2fr 1fr',gap: '0.5rem'}}>

                  <CustomDateInput placeholder={"Start Date"}/>
                  <CustomDateInput placeholder={"End"}/>

                </div>

                <div className="form-group">
                    <input required type="text" id="phn"  readOnly value={place} name="location" placeholder="Location" onFocus={() => setShowMap(true)}/>

                 {showMap  &&  <MapPicker  ref={Mapref} onSelect={(latlng) => {reverseGeocode(latlng.lat, latlng.lng)}} />

                  }  

                </div>

                <div className="form-group">
                    <textarea  id="description" name="description" placeholder="Description(Optional)"/>
                </div>

                <div className="form-group">
                    <input type="submit" name="submit" value="Create Tournment"/>
                </div>

            </form>
        </div>
    </div>




</>
)

}