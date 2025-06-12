import React, { useRef, useState } from "react";
import'../css/match.css';
import Select from 'react-select';
import CustomDateInput from "./CustomDateInput";
import MyTimePicker from "./TimePicker";
export const Match=()=>{
  
  const [TeamA,setTeamA]=useState('Team A');
  const [TeamB,setTeamB]=useState('Team B');


  //to styling and editing <select> <option>
  const [selectedOption, setSelectedOption] = useState(null); 
  const options = [
  { value: 'Nepal Premier League', label: 'Nepal Premier League' },
  { value: 'Indian Premier League', label: 'Indian Premier League' },
];

const [selectedVenue, setSelectedVenue] = useState(null); 
const venues=[
    {value:'Biratnagar',label:"Biratnagar cricket Stadium"},
    {value:'Birtamod',label:"Birtamod cricket Stadium"},
];



  //function to handle submit 
//   const handleSubmit = (e) => {
//   e.preventDefault();
//   if (place==='') {
//     alert("Please select a location.");
//     return;
//   }
//   // Submit the form
// };

  return (

<>

<div className="login" style={{height: '98vh'}}>
        <div className="form-container">
            <h2 style={{textAlign:'center'}}>Create Match</h2>
            <form>

                <div className="form-group" style={{ zIndex:'3',position:'relative',fontWeight:'500'}}>

<Select
  id="name" name="name"
  options={options}
  value={options.find(opt => opt.value === selectedOption) || null}
  onChange={(opt) => setSelectedOption(opt?.value)}
  isClearable
  placeholder="Tournament Name"
  styles={{
    placeholder: (base) => ({
      ...base,
      color: '#888',
    }),
  }}
  required
/>
                </div>


                <div  className="form-group" style={{display:'grid',gridTemplateColumns: '6fr 1fr 6fr',gap: '0.5rem'}}>
      <input 
        type="text"
        value={TeamA}
        required
        onChange={(e) => setTeamA(e.target.value)}
      />
      <span style={{display:'flex', alignItems:'center',justifyContent:'center'}}>vs</span>
      <input 
        type="text"
        value={TeamB}
        required
        onChange={(e) => setTeamB(e.target.value)}
      />

                </div>

                    <div className="form-group" style={{display:'grid',gridTemplateColumns: '1.25fr 1fr',gap: '4.5rem'}}>

                  <CustomDateInput placeholder={"Match Date"}/>
                  <MyTimePicker placeholder={"Time"}/>

                </div>

  <div className="form-group" style={{ zIndex:'3',position:'relative',fontWeight:'500'}}>

<Select
  id="description" name="description"
  options={venues}
  value={venues.find(opt => opt.value === selectedVenue) || null}
  onChange={(opt) => setSelectedVenue(opt?.value)}
  isClearable
  placeholder="Ground Name/Venue"
  styles={{
    placeholder: (base) => ({
      ...base,
      color: '#888',
    }),
  }}
  required
/>
      </div>

                <div className="form-group" style={{marginTop:'1rem'}}>
                    <input type="submit" name="submit" value="Create Match"/>
                </div>

            </form>
        </div>
    </div>




</>
)

}