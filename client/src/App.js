import "./App.css";
import { useEffect, useState } from "react";
import { getHomePage } from "./api/homepage.js";
import Card from "./components/card.jsx";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    getHomePage().then((m) => {
      setMessage(m);
      // console.log(message);
    });
  }, []);

  return (
    <div>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <Card msg={message} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
