import React, { useState } from "react";
import axios from "axios";

function OpenAiQuery() {
   const host = "http://localhost:5000";
  const [query, setQuery] = useState("");
  const [reply, setReply] = useState("");

  const exampleStats = {
    repo: "my-react-app",
    stars: 120,
    forks: 30,
    commits: 200,
    issues: 5,
    contributors: 4,
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${host}/api/chatgpt/ask`, {
        query,
      });
      setReply(res.data.reply);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Ask ChatGPT about your GitHub Stats</h1>
      <textarea
        placeholder="Ask a question about your GitHub repo..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={handleSubmit}>Ask GPT-4</button>
      <div style={{ marginTop: "2rem" }}>
        <h3>Response:</h3>
        <p>{reply}</p>
      </div>
    </div>
  );
}

export default OpenAiQuery;
