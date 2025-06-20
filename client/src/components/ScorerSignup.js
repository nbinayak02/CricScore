import React from "react";
import '../css/login.css';
import { useNavigate } from 'react-router-dom';

import { Link } from "react-router-dom";
import { useContext } from "react";
import cricContext from "../context/CricContext";

export const ScorerSignup=()=>{
const { login }=useContext(cricContext);


    const host="http://localhost:5000";

      const navigate = useNavigate(); // initialize navigation


  //function to handle signupclick 
   const HandleSignup= async(e)=>{
     e.preventDefault(); // prevent page reload

var name=document.getElementById('name').value;
var email=document.getElementById('email').value;
var phone=document.getElementById('phn').value;
var password=document.getElementById('pass').value;
var confirmpassword=document.getElementById('cpass').value;

if(!name){
  alert("Name is required");
  return false;//which prevent the form submission
}

if(!email){
  alert("Email is required");
  return false;
}

if(!phone){
  alert("Phone is required");
  return false;
}
if(!password ){
  alert("Password is required.")
  return false;

}

if(password.length<8){
  alert("Password length should be Minimum 8");
  return false;
}

if(!confirmpassword){
  alert("Please! Enter confirm Password");
  return false;
}

if(confirmpassword!==password){
  alert("Confirm Password doesn't match !");
  return false;
}

//apicall to register user in database

const response = await fetch(`${host}/auth/signup/scorer`, {
  method: "POST",
  credentials:'include',
  headers: {
    "Accept":"*/*",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name:`${name}`,
    phone:`${phone}`,
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
  // to navigate to home after success login with user details
  navigate('/',{state:{user:data.user}});
    }

    else{
      console.log("Unable to register User",response.status);
    }

 

 }  


return(
<>

<div className="login" style={{height: '98vh'}}>
        <div className="login_form-container">
            <h2 style={{textAlign:'center'}}>Create Scorer Account</h2>
            <p style={{ display:'flex',alignItems: 'center',justifyContent: 'space-around'}}><span>Already have an account? <Link to="/login/scorer">Login</Link></span> <svg svg id="Layer_1" style={{height:'50px',width:'50px'}} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style type="text/css">{`
      .st0 { fill: #F0C4DB; }
      .st1 { fill: #FF9D9C; }
      .st2 { fill: #9BEAF9; }
      .st3 { fill: #E9F4BC; }
      .st4 { fill: #505050; }
      .st5 { fill: #FEBECC; }
      .st6 { fill: #FFFFFF; }
      .st7 { fill: #FDE4A1; }
      .st8 { fill: #FEE7B5; }
      .st9 { fill: #CDF6FC; }
      .st10 { fill: #F2C6DD; }
      .st11 { opacity: 0.1; }`}
    </style>
  </defs>
  <g>
    <path class="st5" d="M2.91,24.2c2.09,0.84,4.36,1.32,6.75,1.32c9.95,0,18.01-8.06,18.01-18.01c0-2.25-0.43-4.4-1.19-6.38H2.91V24.2z"/>
    <g>
      <path class="st6" d="M46.07,48.12H7.21c0.06-8.88,6.07-16.33,14.24-18.59l5.19,8.99l5.19-8.99C40,31.79,46.01,39.25,46.07,48.12z"/>
      <path class="st2" d="M39.33,16.2v-2.77l-3.97-0.75c-0.21-0.9-0.57-1.75-1.04-2.52l2.28-3.34l-1.96-1.96L31.3,7.14c-0.77-0.47-1.62-0.83-2.53-1.04l-0.75-3.97h-2.77L24.51,6.1c-0.9,0.21-1.76,0.57-2.53,1.04l-3.34-2.28l-1.96,1.96l2.28,3.34c-0.47,0.77-0.83,1.62-1.04,2.52l-3.97,0.75v2.77l3.97,0.75c0.21,0.9,0.57,1.75,1.04,2.52l-2.28,3.34l1.96,1.96l3.34-2.28c0.77,0.47,1.62,0.83,2.52,1.05l0.75,3.97h2.77l0.75-3.97c0.9-0.21,1.75-0.57,2.52-1.05l3.34,2.28l1.96-1.96l-2.28-3.34c0.47-0.77,0.83-1.62,1.04-2.52L39.33,16.2z M26.64,18.97c-2.3,0-4.16-1.86-4.16-4.16c0-2.3,1.86-4.16,4.16-4.16s4.16,1.86,4.16,4.16C30.8,17.11,28.94,18.97,26.64,18.97z"/>
      <g>
        <path class="st4" d="M32.3,28.81c-0.32-0.09-0.68,0.05-0.85,0.35l-4.54,7.86l-4.54-7.86c-0.17-0.3-0.52-0.44-0.85-0.35C12.88,31.2,6.8,39.14,6.73,48.12c0,0.2,0.08,0.39,0.22,0.53c0.14,0.14,0.33,0.22,0.53,0.22h38.85c0.2,0,0.39-0.08,0.53-0.22c0.14-0.14,0.22-0.33,0.22-0.53C47.02,39.14,40.94,31.2,32.3,28.81z"/>
        <path class="st2" d="M39.33,16.2v-2.77l-3.97-0.75c-0.21-0.9-0.57-1.75-1.04-2.52l2.28-3.34l-1.96-1.96L31.3,7.14c-0.77-0.47-1.62-0.83-2.53-1.04l-0.75-3.97h-2.77L24.51,6.1c-0.9,0.21-1.76,0.57-2.53,1.04l-3.34-2.28l-1.96,1.96l2.28,3.34c-0.47,0.77-0.83,1.62-1.04,2.52l-3.97,0.75v2.77l3.97,0.75c0.21,0.9,0.57,1.75,1.04,2.52l-2.28,3.34l1.96,1.96l3.34-2.28c0.77,0.47,1.62,0.83,2.52,1.05l0.75,3.97h2.77l0.75-3.97c0.9-0.21,1.75-0.57,2.52-1.05l3.34,2.28l1.96-1.96l-2.28-3.34c0.47-0.77,0.83-1.62,1.04-2.52L39.33,16.2z M26.64,18.97c-2.3,0-4.16-1.86-4.16-4.16c0-2.3,1.86-4.16,4.16-4.16s4.16,1.86,4.16,4.16C30.8,17.11,28.94,18.97,26.64,18.97z"/>

      </g>
    </g>
  </g>
  </svg>
  </p>
            <form onSubmit={HandleSignup}>

                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" required id="name" name="name" placeholder="Scorer Full Name"/>
                </div>


                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="text" required id="email" name="email" placeholder="example@domain.com"/>
                </div>

                <div className="form-group">
                    <label htmlFor="phn">Phone Number</label>
                    <input type="text" required id="phn" name="phn" placeholder="9800000000"/>
                </div>

                <div className="form-group">
                    <label htmlFor="pass">Password</label>
                    <input type="password"  required id="pass" name="pass"/>
                </div>

                <div className="form-group">
                    <label htmlFor="cpass">Confirm Password</label>
                    <input type="password" required id="cpass"/>
                </div>

                <div className="form-group">
                    <input type="submit" name="submit" value="Sign up"/>
                    {/* <svg svg id="Layer_1" style={{height:'50px',width:'50px'}} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style type="text/css">{`
      .st0 { fill: #F0C4DB; }
      .st1 { fill: #FF9D9C; }
      .st2 { fill: #9BEAF9; }
      .st3 { fill: #E9F4BC; }
      .st4 { fill: #505050; }
      .st5 { fill: #FEBECC; }
      .st6 { fill: #FFFFFF; }
      .st7 { fill: #FDE4A1; }
      .st8 { fill: #FEE7B5; }
      .st9 { fill: #CDF6FC; }
      .st10 { fill: #F2C6DD; }
      .st11 { opacity: 0.1; }`}
    </style>
  </defs>
  <g>
    <path class="st5" d="M2.91,24.2c2.09,0.84,4.36,1.32,6.75,1.32c9.95,0,18.01-8.06,18.01-18.01c0-2.25-0.43-4.4-1.19-6.38H2.91V24.2z"/>
    <g>
      <path class="st6" d="M46.07,48.12H7.21c0.06-8.88,6.07-16.33,14.24-18.59l5.19,8.99l5.19-8.99C40,31.79,46.01,39.25,46.07,48.12z"/>
      <path class="st2" d="M39.33,16.2v-2.77l-3.97-0.75c-0.21-0.9-0.57-1.75-1.04-2.52l2.28-3.34l-1.96-1.96L31.3,7.14c-0.77-0.47-1.62-0.83-2.53-1.04l-0.75-3.97h-2.77L24.51,6.1c-0.9,0.21-1.76,0.57-2.53,1.04l-3.34-2.28l-1.96,1.96l2.28,3.34c-0.47,0.77-0.83,1.62-1.04,2.52l-3.97,0.75v2.77l3.97,0.75c0.21,0.9,0.57,1.75,1.04,2.52l-2.28,3.34l1.96,1.96l3.34-2.28c0.77,0.47,1.62,0.83,2.52,1.05l0.75,3.97h2.77l0.75-3.97c0.9-0.21,1.75-0.57,2.52-1.05l3.34,2.28l1.96-1.96l-2.28-3.34c0.47-0.77,0.83-1.62,1.04-2.52L39.33,16.2z M26.64,18.97c-2.3,0-4.16-1.86-4.16-4.16c0-2.3,1.86-4.16,4.16-4.16s4.16,1.86,4.16,4.16C30.8,17.11,28.94,18.97,26.64,18.97z"/>
      <g>
        <path class="st4" d="M32.3,28.81c-0.32-0.09-0.68,0.05-0.85,0.35l-4.54,7.86l-4.54-7.86c-0.17-0.3-0.52-0.44-0.85-0.35C12.88,31.2,6.8,39.14,6.73,48.12c0,0.2,0.08,0.39,0.22,0.53c0.14,0.14,0.33,0.22,0.53,0.22h38.85c0.2,0,0.39-0.08,0.53-0.22c0.14-0.14,0.22-0.33,0.22-0.53C47.02,39.14,40.94,31.2,32.3,28.81z"/>
        <path class="st2" d="M39.33,16.2v-2.77l-3.97-0.75c-0.21-0.9-0.57-1.75-1.04-2.52l2.28-3.34l-1.96-1.96L31.3,7.14c-0.77-0.47-1.62-0.83-2.53-1.04l-0.75-3.97h-2.77L24.51,6.1c-0.9,0.21-1.76,0.57-2.53,1.04l-3.34-2.28l-1.96,1.96l2.28,3.34c-0.47,0.77-0.83,1.62-1.04,2.52l-3.97,0.75v2.77l3.97,0.75c0.21,0.9,0.57,1.75,1.04,2.52l-2.28,3.34l1.96,1.96l3.34-2.28c0.77,0.47,1.62,0.83,2.52,1.05l0.75,3.97h2.77l0.75-3.97c0.9-0.21,1.75-0.57,2.52-1.05l3.34,2.28l1.96-1.96l-2.28-3.34c0.47-0.77,0.83-1.62,1.04-2.52L39.33,16.2z M26.64,18.97c-2.3,0-4.16-1.86-4.16-4.16c0-2.3,1.86-4.16,4.16-4.16s4.16,1.86,4.16,4.16C30.8,17.11,28.94,18.97,26.64,18.97z"/>

      </g>
    </g>
  </g>
  </svg> */}
                </div>

                <div className="form-group lw">
                    <p>Signup with</p>
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


);

}