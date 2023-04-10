import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StartSession.css";

function StartSession() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStartSession = async () => {
    try {
      setLoading(true);

      const response = await axios.get("http://localhost:8000/start_session", {
        params: {
          flag: "startnewsession",
        },
      });

      const sessionID = response.data.session_id;
      sessionStorage.setItem("sessionID", sessionID);
      console.log("session id: ", sessionID);
      navigate("/");
    } catch (error) {
      console.error(error);
      // Handle error here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="start-session-container">
      <button
        className="start-session-button"
        disabled={loading}
        onClick={handleStartSession}
      >
        {loading ? "Starting Session..." : "Start Session"}
      </button>
    </div>
  );
}

export default StartSession;
