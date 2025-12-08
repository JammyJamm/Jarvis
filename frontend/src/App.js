import logo from "./logo.svg";
import "./App.css";
import AI_model from "./ai_model";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Office from "./pages/office";
import Money from "./pages/money";
import AI_SearchLayout from "./pages/ai_search";

function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  //useEffect(() => {
  //   const fetchLocation = async () => {
  //     try {
  //       const res = await fetch("http://127.0.0.1:8000/location");
  //       const data = await res.json();
  //       if (!data) throw new Error("Empty response from server");
  //       setResult(data.location);
  //     } catch (err) {
  //       console.error("Fetch error:", err);
  //       setError(err.message);
  //     }
  //   };
  //   // Onload call
  //   const onloadBackEndCall = async () => {
  //     try {
  //       const res = await fetch("https://127.0.0.1:8000/zing-summary");
  //       console.log(res);
  //     } catch (err) {
  //       console.error("Fetch error:", err);
  //       setError(err.message);
  //     }
  //   };
  //   fetchLocation();
  //   onloadBackEndCall();
  // }, []);
  return (
    <div className="App">
      {/* <AI_model /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AI_model />}>
            <Route index element={<Dashboard />} />
            <Route path="office" element={<Office />} />
            <Route path="money" element={<Money />} />
            <Route path="ai" element={<AI_SearchLayout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
