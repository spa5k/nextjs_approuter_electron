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
      Is Electron {isElectron ? "Yes" : "No"}
    </div>
  );
}
