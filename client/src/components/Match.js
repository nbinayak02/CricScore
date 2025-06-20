import React, { useRef, useState } from "react";
import'../css/match.css';
import Select from 'react-select';
import CustomDateInput from "./CustomDateInput";
import MyTimePicker from "./TimePicker";
export const Match=()=>{
  
  const [TeamA,setTeamA]=useState('Team A');
  const [TeamB,setTeamB]=useState('Team B');


  const [matchDate, setMatchDate] = useState('');
const [matchTime, setMatchTime] = useState('');



  //to styling and editing <select> <option>
  const [selectedOption, setSelectedOption] = useState(null); 
  const options = [
  { value: 'Nepal Premier League', label: 'Nepal Premier League' },
  { value: 'Indian Premier League', label: 'Indian Premier League' },
];


const [selectedVenue, setSelectedVenue] = useState(null); 
const venues=[
    {value:'Biratnaga cricket Stadium',label:"Biratnagar cricket Stadium"},
    {value:'Birtamod cricked stadium',label:"Birtamod cricket Stadium"},
];



  // function to handle submit 
  const handleSubmit =async (e) => {
  e.preventDefault();

    const tournament_name=selectedOption;
    var teamA=document.getElementById("teamA").value;
    var teamB=document.getElementById("teamB").value;
    const match_date=matchDate;
    var match_time=matchTime;
    const venue=selectedVenue;

    
  // Submit the form

  const response = await fetch("http://localhost:5000/create/match", {
  method: "POST",
  credentials:'include',
  headers: {
    "Accept":"*/*",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    tournament_name:`${tournament_name}`,
    teamA:`${teamA}`,
    teamB:`${teamB}`,
    match_date:`${match_date}`,
    match_time:`${match_time}`,
    venue:`${venue}`,

   }),

});
if(response.ok){
  const data=await response.json();

// Save to localStorage
  // localStorage.setItem("user", JSON.stringify(data.user));

console.log(data.match);
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
            <h2 style={{textAlign:'center'}}>Create Match</h2>
            <form onSubmit={handleSubmit}>

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
      id="teamA"
        type="text"
        value={TeamA}
        required
        onChange={(e) => setTeamA(e.target.value)}
      />
      <span style={{display:'flex', alignItems:'center',justifyContent:'center'}}>vs</span>
      <input 
      id="teamB"
        type="text"
        value={TeamB}
        required
        onChange={(e) => setTeamB(e.target.value)}
      />

                </div>

                    <div className="form-group" style={{display:'grid',gridTemplateColumns: '1.25fr 1fr',gap: '4.5rem'}}>

                  <CustomDateInput id={"match_date"}  onChange={setMatchDate} placeholder={"Match Date"}/>
                  <MyTimePicker id={"match_time"} onChange={setMatchTime} placeholder={"Time"}/>

                </div>

  <div className="form-group" style={{ zIndex:'3',position:'relative',fontWeight:'500'}}>

<Select
  id="venue" name="description"
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