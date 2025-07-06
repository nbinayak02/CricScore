import "../css/Navbar.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import cricContext from "../context/CricContext";
export const Navbar = () => {
  //navigate to navigate the path of the clicked icon
  //location to check the stored path
  const navigate = useNavigate();
  const location = useLocation();

  //function to show  logout button only after login
  const { isLoggedIn, logout } = useContext(cricContext);

  //function to store the path of clicked nav icon in navigate
  const handleNavClick = (path) => {
    navigate(path);
  };

  //to handle logout
  const handleLogout = (e) => {
    e.preventDefault(); // prevent page reload
    logout();
    //calling islogin function to update login state
    navigate("/login", { replace: true });
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#1D4ED8", color: "white !important" }}
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            onClick={() => handleNavClick("/")}
          >
            CricScore
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{ position: "static" }}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  onClick={() => handleNavClick("/")}
                  aria-current="page"
                  to="/"
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/tournament" ? "active" : ""
                  }`}
                  onClick={() => handleNavClick("/tournament")}
                  to="/tournament"
                >
                  Tournaments
                </Link>
              </li>

               <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/viewmatch" ? "active" : ""
                  }`}
                  onClick={() => handleNavClick("/viewmatch")}
                  to="/viewmatch"
                >
                  Fixtures
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/profile" ? "active" : ""
                  }`}
                  onClick={() => handleNavClick("/profile")}
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
            </ul>

            <div id="form_parent" className="form_parent">
              <form
                className="form_form"
                role="search"
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <div className="fx fx-gap">
                  <div style={{ display: "flex", marginBottom: "2rem" }}>
                    <input type="text" placeholder="Search" required />
                  </div>
                  <div id="search-icon">
                    <button id="search" type="submit">
                      <div id="search-icon-circle"></div>
                      <span></span>
                    </button>
                  </div>
                </div>
                {/* <input style={{color: '#222529',background: '#F1F5F9', marginRight: '-1rem !important'}} className="form-control" type="search" placeholder="Search" aria-label="Search"/>

<button className="btn btn-outline-success" type="submit">        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
</button> */}
              </form>
              {
                <button
                  to="/login"
                  hidden={isLoggedIn ? true : false}
                  style={{
                    textDecoration: "none",
                    width: "auto",
                    height: "auto",
                  }}
                >
                  <span className="profile">Login</span>
                </button>
              }
              {
                <button
                  hidden={isLoggedIn ? false : true}
                  onClick={handleLogout}
                  style={{
                    textDecoration: "none",
                    width: "auto",
                    height: "auto",
                  }}
                >
                  <span className="ProfileLogout">Logout</span>
                </button>
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
