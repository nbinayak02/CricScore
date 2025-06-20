import "../css/login.css"
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import cricContext from "../context/CricContext";

import { Link } from "react-router-dom";

export const Login=()=>{
  const { login } = useContext(cricContext);
   const host="http://localhost:5000";


    const navigate = useNavigate(); // initialize navigation


  //to handle login 
const HandleLogin=async (e)=>{
   e.preventDefault(); // prevent page reload
   var email=document.getElementById('email').value;
   var password=document.getElementById('pass').value;
   var password_error=document.getElementById('password_error');


   if(!email){
    alert("Email is require");
    return false;
   }

   if(!password){
    alert("Password is required");
    return false;//to prevent form from submission

   }

//api call for login
  const response = await fetch(`${host}/auth/login`, {
    method: "POST",
    credentials:'include',
    headers: {
      "Accept":"*/*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email:`${email}`,
      password:`${password}`,

     }),
     


  
  });

  if(response.ok){
    const data=await response.json();

 // Save to localStorage
  localStorage.setItem("user", JSON.stringify(data.user));

  //to handle login button from Cricecontext api
  login(data.user);


    navigate('/',{state:{user:data.user}});

      }
      else{
        password_error.innerHTML="* Email or Password is incorrect.";
      }

   }

    return(
<>
<div className="login">
        <div className="login_form-container">
            <h2 style={{textAlign:'center'}}>Login to Play</h2>
           <p style={{marginBottom:'0.5rem',display:'flex',alignItems:'center',justifyContent:'space-between'}}> <span>Doesn't have an account yet? <Link to="/signup">Sign up</Link></span><svg id="Слой_1" style={{background:'new 0 0 512 512',height:'50px',width:'50px'}} version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <defs>
            <style type="text/css">{`
      .st0 { fill: #F0C4DB; }
      .st1 { fill: #FFF; }
      .st2 { fill: #9BEAF9; }
      .st3 { fill: #E9F4BC; }
      .st4 { fill: #505050; } `}
</style>
</defs>
<g><path className="st0" d="M369.5,135.9c0,67.1-50.8,161.3-113.5,161.3S142.5,203,142.5,135.9S193.3,14.3,256,14.3   S369.5,68.7,369.5,135.9z"/><path className="st1" d="M193.2,188.5h125.5c0,0-8.6,61.1-62.7,62C201.8,251.3,193.2,188.5,193.2,188.5z"/><path className="st2" d="M464.1,365.8c-19-18-131.7-51.2-131.7-51.2l-76.3,85.3l0,0l0,0l-76.3-85.3c0,0-112.7,33.2-131.7,51.2   c-29.3,27.7-31.6,132-31.6,132h479.2C495.6,497.7,493.4,393.5,464.1,365.8z"/></g></svg>
       </p>

       <p style={{marginBottom:'0.5rem'}}>Login for Scorer? <Link to="/login/scorer">Scorer Login</Link></p>
            <form onSubmit={HandleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="text" id="email" name="email" placeholder="example@domain.com"/>
                </div>

                <div className="form-group">
                    <label htmlFor="pass">Password</label>
                    <input type="password" id="pass" name="pass"/>
                     <div id="password_error" name="password_error" style={{color:'#c04a55',marginTop:'-0.1rem!important',textAlign:'center'}} className="form-text my-2"></div>
                </div>

                <div className="form-group" style={{display:"flex",gap:'0.5rem'}}>
                    <input type="checkbox" id="remp" name="remp"/>
                    <label htmlFor="remp">Remember Password</label>
                </div>

                <div className="form-group">
                    <input type="submit" name="submit" value="Login"/>
                </div>

                <div className="form-group fp">
                    <a href="/">Forgot password?</a>
                </div>

                <div className="form-group lw">
                    <p>Login with</p>
                </div>

                <div className="form-group">
                    <button id="google_login" className="google_login">
                        <svg style={{height: '25px' ,width: '25px'}}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
>
  <g>
    <path
      fill="#F44336"
      d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707
      C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321
      C6.4099731,6.9193726,8.977478,5,12,5z"
    />
    <path
      fill="#2196F3"
      d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12
      c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458
      l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z"
    />
    <path
      fill="#FFC107"
      d="M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511
      C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215
      C5.1484375,13.6044312,5,12.8204346,5,12z"
    />
    <path
      fill="#00B060"
      d="M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959
      C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834
      C14.7412109,18.5588989,13.4284058,19,12,19z"
    />
    <path
      opacity="0.1"
      d="M12,23.75c-3.5316772,0-6.7072754-1.4571533-8.9524536-3.7786865C5.2453613,22.4378052,
      8.4364624,24,12,24c3.5305786,0,6.6952515-1.5313721,8.8881226-3.9592285C18.6495972,
      22.324646,15.4981079,23.75,12,23.75z"
    />
    <polygon
      opacity="0.1"
      points="12,14.25 12,14.5 18.4862061,14.5 18.587492,14.25"
    />
    <path
      fill="#E6E6E6"
      d="M23.9944458,12.1470337C23.9952393,
      12.0977783,24,12.0493774,24,
      12c0-0.0139771-0.0021973-0.
      0274658-0.
      0022583-
      0.
      0414429C23.
      9970703,
      12.
      0215454,
      23.
      9938965,
      12.
      0838013,
      23.
      9944458,
      12.
      1470337z"
    />
    <path
      fill="#FFFFFF"
      opacity="0.2"
      d="M12,
      9.
      5v0.
      25h11.
      7855721c-0.
      0157471-0.
      0825195-0.
      0329475-
      0.
      1680908-
      0.
      0503426-
      0.
      25H12z"
    />
    <linearGradient id="SVGID_1_" x1="0" x2="24" y1="12" y2="12" gradientUnits="userSpaceOnUse">
        <stop offset="0" style={{color:'#FFFFFF',opacity:'0.2'}}/>
        <stop offset="1" style={{color:'#FFFFFF',opacity:'0'}}/>
    </linearGradient>
    <path
      fill="url(#SVGID_1_)"
      d="M23.
        7352295,
        9.
        5H12v5h6.
        4862061C17.
        4775391,
        17.
        121582,
        14.
        9771729,
        19,
        12,
        19
        c-3.
        8659668,
        0-
        7-
        3.
        1340332-
        7-
        7c0-
        3.
        8660278,
        3.
        1340332-
        7,
        7-
        7c1.
        4018555,
        0,
        2.
        6939087,
        0.
        4306641,
        3.
        7885132,
        1.
        140686
        c0.
        1675415,
        0.
        1088867,
        0.
        3403931,
        0.
        2111206,
        0.
        4978027,
        0.
        333374l3.
        637146-
        3.
        4699707L19.
        8414307,
        2.
        940979
        C17.
        7369385,
        1.
        1170654,
        15.
        00354,
        0,
        12,
        0C5.
        3725586,
        0,
        0,
        5.
        3725586,
        0,
        12c0,
        6.
        6273804,
        5.
        3725586,
        12,
        12,
        12
        c6.
        1176758,
        0,
        11.
        1554565-
        4.
        5812378,
        11.
        8960571-
        10.
        4981689C23.
        9585571,
        13.
        0101929,
        24,
        12.
        508667,
        24,
        12
        C24,
        11.
        1421509,
        23.
        906311,
        10.
        3068237,
        23.
        7352295,
        9.
        5z"
    />
    <path
      opacity="0.1"
      d="M15.
            7885132,
            5.
            890686C14.
            6939087,
            5.
            1806641,
            13.
            4018555,
            4.
            75,
            12,
            4.
            75c-3.
            8659668,
            0-
            7,
            3.
            1339722-
            7,
            7
            c0,
            0.
            0421753,
            0.
            0005674,
            0.
            0751343,
            0.
            0012999,
            0.
            1171875C5.
            0687437,
            8.
            0595093,
            8.
            1762085,
            5,
            12,
            5
            c1.
            4018555,
            0,
            2.
            6939087,
            0.
            4306641,
            3.
            7885132,
            1.
            140686
            c0.
            1675415,
            0.
            1088867,
            0.
            3403931,
            0.
            2111206,
            0.
            4978027,
            0.
            333374l3.
            637146-
            3.
            4699707l-3.
            637146,
            3.
            2199707C16.
            1289062,
            6.
            1018066,
            15.
            9560547,
            5.
            9995728,
            15.
            7885132,
            5.
            890686z"
    />
    <path
      fill="#FFFFFF"
      opacity="0.2"
      d="M12,0.25c2.9750366,0,
            5.6829224,1.0983887,7.7792969,2.8916016l0.144165-0.1375122
            l-0.110014-0.0958166C17
            .7089558 ,1
            .0843592 ,15
            .00354 ,0 ,12 ,0C5
            .3725586 ,0 ,0 ,5
            .3725586 ,0 ,12c0 ,
            .0421753 ,.0058594 ,.0828857 ,.0062866 ,.125C .0740356 ,5
            .5558472 ,5 .4147339 , .25 ,12 , .25z"
    />
   </g>
</svg>
                        <span id="google_logo" className="google_logo">   Google
                        </span>
                        </button>
                </div>
            </form>
        </div>
    </div>


</>

    )



}