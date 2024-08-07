"use client";

import { useEffect, useState } from "react";

export function ElectronCheck(): JSX.Element {
  const [isElectron, setIsElectron] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && /Electron/.test(navigator.userAgent)) {
      setIsElectron(true);
    } else {
      setIsElectron(false);
    }
  }, []);

  return (
    <div
      style={{
        border: "1px solid #007acc",
        padding: "20px",
        textAlign: "center",
        borderRadius: "10px",
        backgroundColor: "#f0f8ff",
        maxWidth: "400px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p style={{ fontSize: "1.5em", color: "#333" }}>Is Electron - {isElectron ? "Yes" : "No"}</p>
      <br />
      {isElectron && (
        <button
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundColor: "#007acc",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1em",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#005fa3")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007acc")}
          onClick={() => {
            window.electron.ipcRenderer.send("ping");
          }}
        >
          Ping Electron
        </button>
      )}
    </div>
  );
}
