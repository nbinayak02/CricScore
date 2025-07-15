import { useState,useEffect, } from "react";
import'../css/scoring.css';
import Select from 'react-select';
import { useLocation,useNavigate } from "react-router-dom";
import '../css/loading.css';
export const Scoring=()=>{


   const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const navigate = useNavigate(); 

  

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

  }, [user]);

    const host = "http://localhost:5000";

  const location=useLocation();
 const { match }= location.state || {};

 const [loading, setLoading] = useState(true);
 const [progress, setProgress] = useState(0);

// const teamA_id=match.teamA_id;
// const teamB_id=match.teamB_id;

//  console.log(match.tournament_name);
//  console.log(match._id);
//  console.log("Team A id:"+match.teamA_id);
//  console.log("Team B id:"+match.teamA_id);

  const [TeamA,setTeamA]=useState(null);
  const [TeamB,setTeamB]=useState(null);




  // setting the Team na to board if state is present
  // {match? setTeamA(match.TeamA) : setTeamA('Team A')};
  // {match? setTeamB(match.TeamA) : setTeamB('Team B')};

  // /:id/get

  //to styling and editing <select> <option>
  const [selectedBastman1, setSelectedBastman1] = useState(null); 
  const [selectedBastman2, setSelectedBastman2] = useState(null); 

  const [Battingoptions,setBattingoptions] = useState(null)
  const [bowlers,setbowlers]=useState(null);
//   [
//   { value: 'Aarif Sheikh', label: 'Aarif Sheikh' },
//   { value: 'Dipendra Singh Airee', label: 'Dipendra Singh Airee' },
//   { value: 'Kushal Bhurtel', label: 'Kushal Bhurtel' },
//   { value: 'Sandeep Lamichhane', label: 'Sandeep Lamichhane' },
// ];

const [selectedbowler, setSelectedbowler] = useState(null); 
//   { value: 'Dipendra Singh Airee', label: 'Dipendra Singh Airee' },
//   { value: 'Kushal Bhurtel', label: 'Kushal Bhurtel' },
//   { value: 'Sandeep Lamichhane', label: 'Sandeep Lamichhane' },
// ];
const [over, setover]=useState(null);
const overoptions=[
  { value: 0, label: "0" },
  { value: 1, label: "1" }
];

const [ball,setball]=useState(null);
const balloptions=[
  { value:1, label:"1"},
  { value:2, label:"2"},
  { value:3, label:"3"},
  { value:4, label:"4"},
  { value:5, label:"5"},
  { value:6, label:"6"},
  { value:7, label:"7"}
];

const playStateOptions = [
  { value: "in_play", label: "In Play" },
  { value: "drinks", label: "Drinks" },
  { value: "ball_change", label: "Ball Change" },
  { value: "injury", label: "Injury" },
  { value: "crowd_interruption", label: "Crowd Interruption" },
  { value: "timeout", label: "Timeout" },
  { value: "drinks_time_off", label: "Drinks (Time Off)" },
  { value: "rain", label: "Rain" },
  { value: "ground_delay", label: "Ground Delay" },
  { value: "bad_light", label: "Bad Light" },
  { value: "break_in_play", label: "Break In Play" },
  { value: "lunch", label: "Lunch" },
  { value: "tea", label: "Tea" },
  { value: "end_of_day", label: "End of Day" },
  { value: "other_no_play_state", label: "Other/No Play State" },
];


//handling the playState

  const [playState, setPlayState] = useState("in_play");
  const [isPause, setIsPause] = useState(false);

  const handlePlayStateChange = (selectedOption) => {
    const selectedValue = selectedOption?.value || "in_play";
    setPlayState(selectedValue);
    setIsPause(selectedValue !== "in_play");
  }

  const handleResumeState=()=>{
    setIsPause(false);
    setPlayState("in_play");
  }

// 0

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
       setProgress(20); // Start slow

    const interval = setInterval(() => {
      setProgress(prev => (prev < 90 ? prev + 10 : prev));
    }, 200); // Fake loading forward
    try {
      // await Promise.all([fetchTeamAData(), fetchTeamBData()]);
      setProgress(100);
    } catch (error) {
      console.error("Error loading data", error);
    } finally {
          setTimeout(() => {
        setLoading(false);
        setProgress(0);
        clearInterval(interval);
      }, 400); // Let the bar stay full for a bit
    }
  };

  fetchData();
}, [match]);



  return (
    
    <>
{loading && (
  <div className="loading-bar-container">
    <div className="loading-bar-progress" style={{ width: `${progress}%` }}></div>
  </div>
)}


<div className="login" style={{height: 'auto'}}>
        <div className="form-container">
          <h1 style={{alignItems:'center',textAlign:'center'}}> {match ? match.tournament_name :"Tournament Name"}</h1>
            {/* <h2 style={{textAlign:'start',color:'#212529'}}>Scoring</h2> */}
            {/* <div style={{  width:'auto',borderBottom: '2px solid gray', borderWidth:'medium'}}/> */}
            <form>
            <div id="scoring_head" className="scoring_head">
 <div className="section-title">Score Summary</div>
             <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 2fr',justifyContent:'center',alignItems:'center',gap:"0.5rem"}}>
                <span>{ TeamA? TeamA.teamName : 'Team A' }</span>
                <span> vs </span>
                <span>{TeamB ? TeamB.teamName :'Team B'}</span>
             </div>
            </div>
    <div style={{ width:'auto',borderBottom: '2px solid gray', borderWidth:'medium'}}/>
    <div id="score_summary">

      <div id="summary_left" style={{display:'grid',gridTemplateRows:'1fr 1fr 1fr 1fr',alignItems:'center'}}>
        <div id="team_Batting"><span style={{fontSize:'20px', fontWeight:'650'}}>England </span><span> 86/1 </span><span> dec </span><span>  &  </span><span style={{fontSize:'20px',fontWeight:'600'}}>  18/1 <span>(0.4)</span></span></div>
        <div id="team_Bowling"><span style={{fontSize:'17px', fontWeight:'550'}}>Australia </span><span> 62/4</span><span> dec </span><span>  &  </span><span style={{fontSize:'17px',fontWeight:'550'}}>  36/0 <span>(0.4)</span></span></div>
        <div>      </div>
        <div>England Win By 9 wicket</div>
      </div>
      <div id="summary_right">
        <div id="summary_right_left" style={{display:'grid', gridTemplateColumns:'1fr 1fr'}}>
          <div id="col1_head">
            <div className="">Last Wicket</div>
            <div className="">Last 5 Overs</div>
            <div className="">Sessions</div>
            <div className="">Run Rate</div>
          </div>
          <div id="col1_value" style={{fontWeight:'600'}}>
            <div className="">0/1</div>
            <div className="">N/A</div>
            <div className="">202/6</div>
            <div className="">27</div>
          </div>
        </div>
        <div id="summary_right_right" style={{display:'grid',gridTemplateColumns:'1fr 1fr'}}>
          <div id="col2_head">
            <div className="">DRS</div>
            <div className="">Over Rate</div>
            <div className="">Cut Off</div>
            <div className="">Over Runs</div>
          </div>
          <div id="col2_value" style={{fontWeight:'600'}}>
            <div>N/A</div>
            <div>N/A</div>
            <div>N/A</div>
            <div>79</div>
          </div>
        </div>
      </div>
    </div>


 <div className="section-title">Play Control</div>
    <div style={{  width:'auto',borderBottom: '2px solid gray', borderWidth:'medium'}}/>
<div id="play_control" name="play_control" style={{display:'grid', gridTemplateColumns:'5fr 2fr 5fr'}}>

                <div id="left_scoring" className="form-group" style={{  display:'flex' ,flexDirection:'column',gap:'1rem' ,zIndex:'4',position:'relative',fontWeight:'500', margin:'1rem'}}>
                  <div id="Striker" style={{display:'grid' ,alignItems:'center',justifyContent:'center', gridTemplateColumns:'1fr 4fr'}}>

<label htmlFor="bastman1">Striker:</label>
<Select
  id="batsman1" name="batsman1"
  options={Battingoptions?Battingoptions:null}
  value={Battingoptions?Battingoptions.find(opt => opt.value === selectedBastman1) || null  :null}
  onChange={(opt) => setSelectedBastman1(opt?.value)}
  isDisabled={isPause}
  isClearable
  placeholder="Striker"
  styles={{
    placeholder: (base) => ({
      ...base,
      menuPortal: base => ({ ...base, zIndex: 9999 }) ,
      color: '#888',
      marginBottom:'10px',
    }),
  }}
  required
/>
  </div>


  <div id="non_striker" style={{display:"grid",alignItems:"center",justifyContent:'center',gridTemplateColumns:'1fr 4fr 1fr'}}>

<label htmlFor="batsman2">Non Striker:</label>
<Select
  id="batsman2" name="batsman2"
  options={Battingoptions?Battingoptions:null}
  value={Battingoptions? Battingoptions.find(opt => opt.value === selectedBastman2) || null :null} 
  onChange={(opt) => setSelectedBastman2(opt?.value)}
  isClearable
  placeholder="Non Striker"
  isDisabled={isPause}
  styles={{
    placeholder: (base) => ({
      ...base,
      color: '#888',
      menuPortal: base => ({ ...base, zIndex: 9999 }) ,
      marginBottom:'10px',
    }),
  }}
  required
/>
    {/* Swap Button */}
  <button
    type="button"
    onClick={() => {
      const temp = selectedBastman1;
      setSelectedBastman1(selectedBastman2);
      setSelectedBastman2(temp);
    }}
    style={{
      width:'auto',
      alignSelf: 'center',
      justifySelf: 'center',
      padding: '0.4rem 1rem',
      fontWeight: 'bold',
      backgroundColor: '#6f6e6e',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    }}
  >⟲</button>
  </div>
<div id="this_over" style={{display:'grid',alignItems:'center',justifyContent:'center',gridTemplateColumns:'2fr 4fr'}}>
  <label htmlFor="over">This Over:</label>
  <table id="over"> 
    <thead>

  <tr className="current_over">
  <td>6</td>
  <td>6</td>
  <td>W</td>
  <td>6</td>
  </tr>
    </thead>
  </table>
  </div>
   </div>

<div id="center_scoring" style={{display:"flex",flexDirection:"column",justifyContent:'space-between',position:'relative'}}>
<table>
  <thead>
   <tr>
<th>R</th>
<th>B</th>
<th>4</th>
<th>6</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>18</td>
    <td>3</td>
    <td>0</td>
    <td>3</td>
  </tr>
  <tr>
    <td>18</td>
    <td>3</td>
    <td>0</td>
    <td>3</td>
  </tr>
  <tr>
    <td>18</td>
    <td>3</td>
    <td>0</td>
    <td>3</td>
  </tr>
  <tr>
    <td>18</td>
    <td>3</td>
    <td>0</td>
    <td>3</td>
  </tr>
  </tbody>
</table>
<div id="ps" style={{display:"flex",flexDirection:'row',gap:'1rem',position:'absolute', bottom:'1.5rem'}}>
  <span>P/S</span>
  <table>
    <thead>
    <tr>
      <th>6</th>
      <th>1</th>
      <th>0</th>
      <th>0</th>
    </tr>
    </thead>
  </table>
</div>
</div>
  <div id="right_scoring" className="form-group" style={{  display:'flex' ,flexDirection:'column',gap:'1rem' ,zIndex:'3',position:'relative',fontWeight:'500',margin:'1rem'}}>
<div id="bowler_bowler " style={{display:'grid' ,alignItems:'center' ,justifyContent:'center',gridTemplateColumns:'1fr 4fr'}}>
<label htmlFor="bowler">Bowler:</label>              
<Select
  id="bowler" name="bowler"
  options={bowlers?bowlers:null}
  value={bowlers?bowlers.find(opt => opt.value === selectedbowler) || null:null}
  onChange={(opt) => setSelectedbowler(opt?.value)}
  isDisabled={isPause}
  isClearable
  placeholder="Bowler"
  styles={{
    placeholder: (base) => ({
      ...base,
      menuPortal: base => ({ ...base, zIndex: 9999 }) ,
      color: '#888',
      marginBottom:'10px',
    }),
  }}
  required
/>
  </div>
<div id="over_over" style={{display:'grid',alignItems:'center',justifyContent:'center',gridTemplateColumns:'1fr 4fr'}}>
<label htmlFor="over_ball">Over/Ball:</label>
<span id="over_ball">
  <Select
  id="over" name="over"
  options={overoptions}
  value={overoptions.find(opt => opt.value === over) || null}
  onChange={(opt) => setover(opt?.value)}
  isDisabled={isPause}
  placeholder="Over"
  styles={{
    placeholder: (base) => ({
      ...base,
      menuPortal: base => ({ ...base, zIndex: 9999 }) ,
      color: '#888',
    }),
  }}
  required
/>
<Select
  id="ball" name="ball"
  options={balloptions}
  value={balloptions.find(opt => opt.value === ball) || null}
  onChange={(opt) => setball(opt?.value)}
  placeholder="Ball"
  isDisabled={isPause}
  styles={{
    placeholder: (base) => ({
      ...base,
      menuPortal: base => ({ ...base, zIndex: 9999 }) ,
      color: '#888',
    }),
  }}
  required
/>
    <button type="button" id="undo_ball" className="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="35" height="35">
  <circle cx="256" cy="256" r="238" fill="#4DB6AC"/>
  <polygon fill="none" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"
    points="168.5,357 230.3,279.4 106.8,279.4"/>
  <path d="M405.2,279.4c0-165.9-236.7-165.9-236.7,0"
    fill="none" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
</svg></button>
</span>
    </div>

    <div id="play_state">
      <div id="state" style={{display:'grid',alignItems:'center',justifyContent:'center',gridTemplateColumns:'1fr 3fr'}}>
<label htmlFor="state_state">Play State:</label>
      <Select
    isDisabled={isPause}
  id="state_state" name="state_state"
  options={playStateOptions?playStateOptions:null}
  value={ playStateOptions.find(opt => opt.value === playState) || null} 
  onChange={handlePlayStateChange}
  placeholder="Play State"
  styles={{
    placeholder: (base) => ({
      ...base,
      color: '#888',
      menuPortal: base => ({ ...base, zIndex: 9999 }) ,
      marginBottom:'10px',
    }),
  }}
  required
/>
  </div>
    <button hidden={isPause} type="button" id="end_inning" className="btn btn-success">End<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="35" height="35">
  <circle cx="250" cy="245" r="230" fill="#DC2626"/>
  <line x1="190" y1="120" x2="280" y2="350" stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round"/>
  <path d="M190,120 
           c30,10 60,0 90,10 
           s60,0 90,10 
           v60 
           c-30,-10 -60,0 -90,-10 
           s-60,0 -90,-10 
           z"
        fill="#FFFFFF" 
        stroke="#FFFFFF" 
        strokeWidth="4" 
        strokeLinejoin="round"/>
  <rect x="270" y="350" width="35" height="10" rx="4" fill="#FFFFFF"/>
</svg></button>
{isPause && (
    // Resume SVG
    <button  onClick={handleResumeState}id="resume_inning" type="button" className="btn btn-outline-success">Play
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="35" height="35">
      <circle cx="256" cy="256" r="230" fill="#16A34A" />
      <polygon points="200,160 200,360 340,260" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="5" />
    </svg>
    </button>
    )
  }
    </div>


                </div>

    </div>

    {/* <div id="scoring"> */}

 <div className="section-title">Scoring</div>
    <div style={{  width:'auto',borderBottom: '2px solid gray', borderWidth:'medium'}}/>

  <div className="header-table">
    <div></div>
    <div className="header-cell" colSpan="3" style={{background:'#7ce293'}}>Runs</div>
    <div className="header-cell" colSpan="3" style={{background:'#71abf1'}}>Wides</div>
    <div className="header-cell" colSpan="2" style={{background:'#d75a5a',color:"white"}}>Byes</div>
    <div className="header-cell" colSpan="2" style={{background:'#eddb76'}}>Leg Byes</div>
    <div className="header-cell" colSpan="2" style={{background:'#7ba8a3'}}>No Ball (b)</div>
    <div className="header-cell" colSpan="2" style={{background:'#44d7e1'}}>No Ball (lb)</div>
    <div className="header-cell" colSpan="3" style={{background:'#c43138',color:'whitesmoke'}}>No Ball (Runs)</div>
  </div>

  <div className="scoring-panel" >
    {/* <div className="label">Wicket</div> */}
    <button disabled={isPause} type="button" id="wicket" className="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="36" height="36">
  <path fill="#111111" d="M125.991 40.945h10.041v10.041c0 5.5 4.46 9.96 9.96 9.96h70.005c5.5 0 9.96-4.46 9.96-9.96V40.945h10.041c5.5 0 9.96-4.46 9.96-9.96s-4.46-9.96-9.96-9.96h-10.041V10.983c0-5.501-4.46-9.96-9.96-9.96h-70.005c-5.5 0-9.96 4.459-9.96 9.96v10.042h-10.041c-5.5 0-9.96 4.46-9.96 9.96s4.46 9.96 9.96 9.96z"/>
  <path fill="#111111" d="M276.002 40.945h10.041v10.041c0 5.5 4.46 9.96 9.96 9.96h70.005c5.5 0 9.96-4.46 9.96-9.96V40.945h10.041c5.5 0 9.96-4.46 9.96-9.96s-4.46-9.96-9.96-9.96h-10.041V10.983c0-5.501-4.46-9.96-9.96-9.96h-70.005c-5.5 0-9.96 4.459-9.96 9.96v10.042h-10.041c-5.5 0-9.96 4.46-9.96 9.96s4.46 9.96 9.96 9.96z"/>
  <path fill="#87CEEB" d="M431.053 451.054h-10.082V100.948c0-10.984-8.936-19.92-19.92-19.92h-30.083c-10.984 0-19.92 8.936-19.92 19.92v350.106h-60.086V100.948c0-10.984-8.936-19.92-19.92-19.92h-30.082c-10.984 0-19.92 8.936-19.92 19.92v350.106h-60.086V100.948c0-10.984-8.936-19.92-19.92-19.92h-30.083c-10.984 0-19.92 8.936-19.92 19.92v350.106H80.947c-10.984 0-19.92 8.936-19.92 19.92v20.083c0 10.984 8.936 19.92 19.92 19.92h350.105c10.984 0 19.92-8.936 19.92-19.92v-20.083c0-10.984-8.936-19.92-19.919-19.92z"/>
  <path fill="#00BFFF" d="M370.967 100.948h30.083v350.106h-30.083V100.948z"/>
  <path fill="#00BFFF" d="M110.949 100.948h30.083v350.106h-30.083V100.948z"/>
  <path fill="#B0E0E6" d="M80.947 491.057v-20.083c110.749 0 228.966 0 350.105 0v20.082c-35.919 0-340.205.001-350.105.001z"/>
</svg></button>
    <button disabled={isPause} className="scoring-button" style={{background:'#7ce293'}}>0</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#7ce293'}}>1</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#7ce293'}}>2</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#71abf1'}}>w</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#71abf1'}}>+1</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#71abf1'}}>+2</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#d75a5a',color:'white'}}>1</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#d75a5a',color:'white'}}>2</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#eddb76'}}>1</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#eddb76'}}>2</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#7ba8a3'}}>1</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#7ba8a3'}}>2</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#44d7e1'}}>0</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#44d7e1'}}>1</button>
    <button disabled={isPause} className="scoring-button"  style={{background:'#c43138',color:'whitesmoke'}}>2</button>
    <button disabled={isPause} className="scoring-button"  style={{background:'#c43138',color:'whitesmoke'}}>3</button>
    <button disabled={isPause} className="scoring-button"  style={{background:'#c43138',color:'whitesmoke'}}>4</button>

    <div className="label">Pen</div>
    <button disabled={isPause} className="scoring-button" style={{background:'#7ce293'}}>3</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#7ce293'}}>4</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#7ce293'}}>6</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#71abf1'}}>+3</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#71abf1'}}>+4</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#71abf1'}}>?</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#d75a5a',color:'white'}}>3</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#d75a5a',color:'white'}}>4</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#eddb76'}}>3</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#eddb76'}}>4</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#7ba8a3'}}>3</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#7ba8a3'}}>4</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#44d7e1'}}>3</button>
    <button disabled={isPause} className="scoring-button" style={{background:'#44d7e1'}}>4</button>
    <button disabled={isPause} className="scoring-button"  style={{background:'#c43138',color:'whitesmoke'}}>6</button>
    <button disabled={isPause} className="scoring-button"  style={{background:'#c43138',color:'whitesmoke'}}>-</button>
    <button disabled={isPause} className="scoring-button"  style={{background:'#c43138',color:'whitesmoke'}}>-</button>
  </div>

{/* <button type="button" id="add_run" className="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="50" height="50">
  <path fill="#EA685E" d="M10,55c0,0,11.3-0.7,15-3s20.3-25.3,22.5-29c2.4-3.7-11.8-9.6-11.8-9.6s-3.3-2.1-5.3-1.1s0.1,4.3,1.6,6.3c1.5,2,0,4.9-3.2,4.4c-1.4-0.2-7-0.9-7-0.9s0.1,3.8-0.8,8.9c-0.9,5.4-1.2,9.4-3.8,12.8S8.7,48.3,8,51S10,55,10,55z"/>
  <path fill="#E64C3C" d="M38.9,14.9l-0.3,0.3c-2.1,3.8-1,8.6,2.5,11l3.2,1.5c1.6-2.2,2.7-3.9,3.2-4.7C49.1,20.5,43,16.9,38.9,14.9z"/>
  <path fill="#F8B319" d="M46,19.3c0,0-7.9,12-9.8,14.8c-1.9,2.8-11,14.5-14,15.9c-3,1.4-14,3.3-14,3.3C8.8,54.4,10,55,10,55s11.3-0.7,15-3c3.7-2.3,20.3-25.3,22.5-29C48.2,21.9,47.4,20.6,46,19.3z"/>
  <path fill="none" stroke="#2C3E50" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M10,55c0,0,11.3-0.7,15-3s20.3-25.3,22.5-29c2.4-3.7-11.8-9.6-11.8-9.6s-3.3-2.1-5.3-1.1s0.1,4.3,1.6,6.3c1.5,2,0,4.9-3.2,4.4c-1.4-0.2-7-0.9-7-0.9s0.1,3.8-0.8,8.9c-0.9,5.4-1.2,9.4-3.8,12.8S8.7,48.3,8,51S10,55,10,55z"/>
  <polyline fill="#8C623B" points="28.4,55 39.2,42.2 42.6,55 52.4,42.2 56,55"/>
  <polyline fill="none" stroke="#2C3E50" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" points="28.4,55 39.2,42.2 42.6,55 52.4,42.2 56,55"/>
  <path fill="none" stroke="#2C3E50" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M8.2,53.3c0,0,11-1.9,14-3.3s12.1-13.1,14-15.9S46,19.3,46,19.3"/>
  <line x1="21.2" y1="29.3" x2="31.9" y2="34.2" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
  <line x1="20.7" y1="32.8" x2="29.9" y2="37.1" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
  <line x1="20.1" y1="36.3" x2="27.8" y2="40" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
  <path d="M41.1,26.3c-3.5-2.5-4.6-7.2-2.5-11" stroke="#2C3E50" strokeWidth="2" strokeDasharray="0,3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
</svg>
Add run</button> */}



            </form>
        </div>
    </div>
</>
)

}