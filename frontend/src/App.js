import logo from "./logo.svg";
import "./App.css";
import AI_model from "./ai_model";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/location");
        const data = await res.json();
        if (!data) throw new Error("Empty response from server");
        setResult(data.location);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      }
    };

    fetchLocation();
  }, []);
  return (
    <div className="App">
      <AI_model />
    </div>
  );
}

export default App;
