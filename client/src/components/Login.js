import "../css/login.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import cricContext from "../context/CricContext";

import { Link } from "react-router-dom";

export const Login = () => {
  const { login } = useContext(cricContext);
  const host = "http://localhost:5000";

  const navigate = useNavigate(); // initialize navigation

  //to handle login
  const HandleLogin = async (e) => {
    
    e.preventDefault(); // prevent page reload
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    var password_error = document.getElementById("password_error");

    if (!email) {
      alert("Email is required");
      return false;
    }

    if (!password) {
      alert("Password is required");
      return false;
    }

    //api call for login
    const response = await fetch(`${host}/api/cricscore/scorer/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
    });

    const data = await response.json();
    // alert(data.message);

    if (response.ok) {

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      //to handle login button from Cricecontext api
      login(data.user);

      navigate("/", { state: { user: data.user } });

    } else {
      password_error.innerHTML = "* Email or Password is incorrect.";
     }
  };

  return (
    <>
      <div className="login">
        <div className="login_form-container">
          <h2 style={{ textAlign: "center" }}>Scorer Login</h2>
          <p
            style={{
              marginBottom: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <span>
              Doesn't have an account yet? <Link to="/signup">Sign up</Link>
            </span>
            <svg
              id="Слой_1"
              style={{
                background: "new 0 0 512 512",
                height: "50px",
                width: "50px",
              }}
              version="1.1"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <style type="text/css">
                  {`
      .st0 { fill: #F0C4DB; }
      .st1 { fill: #FFF; }
      .st2 { fill: #9BEAF9; }
      .st3 { fill: #E9F4BC; }
      .st4 { fill: #505050; } `}
                </style>
              </defs>
              <g>
                <path
                  className="st0"
                  d="M369.5,135.9c0,67.1-50.8,161.3-113.5,161.3S142.5,203,142.5,135.9S193.3,14.3,256,14.3   S369.5,68.7,369.5,135.9z"
                />
                <path
                  className="st1"
                  d="M193.2,188.5h125.5c0,0-8.6,61.1-62.7,62C201.8,251.3,193.2,188.5,193.2,188.5z"
                />
                <path
                  className="st2"
                  d="M464.1,365.8c-19-18-131.7-51.2-131.7-51.2l-76.3,85.3l0,0l0,0l-76.3-85.3c0,0-112.7,33.2-131.7,51.2   c-29.3,27.7-31.6,132-31.6,132h479.2C495.6,497.7,493.4,393.5,464.1,365.8z"
                />
              </g>
            </svg>
          </p>

          <form onSubmit={HandleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="example@domain.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="pass">Password</label>
              <input type="password" id="pass" name="pass" />

              <div
                id="password_error"
                name="password_error"
                style={{
                  color: "#c04a55",
                  marginTop: "-0.1rem!important",
                  textAlign: "center",
                }}
                className="form-text my-2"
              ></div>
            </div>

            <div
              className="form-group"
              style={{ display: "flex", gap: "0.5rem" }}
            >
              <input type="checkbox" id="remp" name="remp" />
              <label htmlFor="remp">Remember Password</label>
            </div>

            <div className="form-group">
              <input type="submit" name="submit" value="Login" />
            </div>

            <div className="form-group fp">
              <a href="/">Forgot password?</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
