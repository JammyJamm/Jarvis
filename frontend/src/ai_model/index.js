import React, { useState } from "react";
import axios from "axios";

function AI_model() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", { prompt });
      const jsonObjects = res.data.response.match(/\{[^}]*\}/g);
      const finalArray = jsonObjects.map((obj) => JSON.parse(obj));
      const combined = finalArray.map((item) => item.response).join("");
      console.log(combined);
      setResponse(combined);
    } catch (err) {
      console.error(err);
      setResponse("Error: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modelUI"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div
        style={{
          padding: 24,
          fontFamily: "Arial, sans-serif",
          maxWidth: "500px",
        }}
      >
        <h1>Ask Anything</h1>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask something..."
          style={{ width: "100%", height: 120, padding: 12, fontSize: 16 }}
        />

        <div style={{ marginTop: 12 }}>
          <button
            onClick={send}
            disabled={loading}
            style={{ padding: "8px 16px" }}
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>

        <div style={{ marginTop: 20 }}>
          <h3>Response</h3>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              background: "#f6f6f6",
              padding: 12,
            }}
          >
            {response}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default AI_model;
