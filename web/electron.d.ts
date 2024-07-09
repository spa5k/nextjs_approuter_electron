// electron-window.d.ts
declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        send: (channel: string, ...args: any[]) => void;
        // Define other ipcRenderer methods you use here
      };
    };
  }
}

export {};
