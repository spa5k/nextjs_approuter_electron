"use client";

import { useState } from "react";

export const CounterClientComponent = () => {
  const [count, setCount] = useState(0);
  return (
    <div style={{ border: "blue 1px dotted" }}>
      <p>ClientComponent</p>
      <h1>{count}</h1>
      <button
        onClick={() => setCount(count + 1)}
        style={{ padding: "10px", margin: "10px", backgroundColor: "blue", color: "white" }}
      >
        Increment
      </button>
    </div>
  );
};
