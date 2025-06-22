import cricContext from "./CricContext";
import { useState, useEffect } from "react";

const CricScoreState = (props) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Update localStorage when user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <cricContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {props.children}
    </cricContext.Provider>
  );
};
export default CricScoreState;
