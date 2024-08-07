"use client";

import { useState } from "react";

export const CounterClientComponent = () => {
  const [count, setCount] = useState(0);
  return (
    <div
      style={{
        border: "1px dotted blue",
        padding: "20px",
        textAlign: "center",
        borderRadius: "10px",
        backgroundColor: "#f0f8ff",
      }}
    >
      <p style={{ fontSize: "1.5em", color: "#333" }}>Client Component</p>
      <h1 style={{ fontSize: "2.5em", color: "#007acc" }}>{count}</h1>
      <button
        onClick={() => setCount(count + 1)}
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
      >
        Increment
      </button>
    </div>
  );
};
