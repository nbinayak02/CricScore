import React from "react";
import '../css/welcome.css';

export const Welcome=()=>{
return(
<>
<div style={{marginLeft:'2rem'}}>

<div id="user_name">
    <h1>Welcome Samir</h1>
</div>

<div id="create">
    <button type="button" id="create_tournment" className="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>Create Tournament</button>
    <button type="button" id="create_match" className="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>Create Match</button>

</div>

<div id="view_tournment"><span><a href="/">View All Tournaments</a></span></div>
<div id="view_matche"><span><a href="/">View All Matches</a></span></div>


</div>
</>
    
)
}
