import { useEffect, useState } from "react";
import "../css/welcome.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Welcome = () => {

  //location is use to get the data passed using navigate
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  useEffect(() => {

    if (!user) {
      navigate("/login");
    }

  }, [user]);

  return (
    <>
      <div style={{ marginLeft: "2rem" }}>
        {user && (
          <div id="user_name">
            <h1>Welcome {user.name}</h1>
            <h2>Id: {user.id}</h2>
            <h2>Email: {user.email}</h2>
            <h1>Phone: {user.phone}</h1>
            <h1>Date: {user.date}</h1>
          </div>
        )}

        <div id="create">
          <Link to="/tournament" style={{ textDecoration: "none" }}>
            <button
              type="button"
              id="create_tournment"
              className="btn btn-success"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              Create Tournament
            </button>
          </Link>
          <Link to="/match" style={{ textDecoration: "none" }}>
            {" "}
            <button type="button" id="create_match" className="btn btn-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              Create Match
            </button>
          </Link>
        </div>

        <div id="view_tournment">
          <span>
            <a href="/">View All Tournaments</a>
          </span>
        </div>
        <div id="view_matche">
          <span>
            <a href="/">View All Matches</a>
          </span>
        </div>
      </div>
    </>
  );
};
