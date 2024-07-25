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
    <div>
      Is Electron - {isElectron ? "Yes" : "No"}

      <br />

      {isElectron && (
        <button
          style={{ padding: "10px", margin: "10px", backgroundColor: "blue", color: "white" }}
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
