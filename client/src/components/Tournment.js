import React, { useRef, useState } from "react";
import'../css/tournament.css';
import CustomDateInput from "./CustomDateInput";
import MapPicker from './MapPicker';
export const Tournament=()=>{
  
    const host="http://localhost:5000";

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

  //function to handle submit 
  const handleSubmit = async (e) => {
    e.preventDefault();

    var tournament_name=document.getElementById("name").value;
    var start_date=document.getElementById("start_date").value;
    var end_date=document.getElementById("end_date").value;
    var location=document.getElementById("phn").value;
    var description=document.getElementById("description").value;


  if (place==='') {
    alert("Please select a location.");
    return;
  }

  // Submit the form

  //apicall to enter tournment details in database

const response = await fetch("http://localhost:5000/create/tournament", {
  method: "POST",
  credentials:'include',
  headers: {
    "Accept":"*/*",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    tournament_name:`${tournament_name}`,
    start_date:`${start_date}`,
    end_date:`${end_date}`,
    location:`${location}`,
    description:`${description}`,

   }),

});
if(response.ok){
  const data=await response.json();

// Save to localStorage
  // localStorage.setItem("user", JSON.stringify(data.user));

console.log(data.touranment);
  // navigate('/',{state:{user:data.user}});
    }

    else{
      console.log("Unable to create Tournament",response.status);
    }

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

                  <CustomDateInput id={"start_date"} placeholder={"Start Date"}/>
                  <CustomDateInput id={"end_date"}  placeholder={"End"}/>

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