import { app, BrowserWindow } from "electron";
import { getPort } from "get-port-please";
import { startServer } from "next/dist/server/lib/start-server";
import * as path from "path";

let win: BrowserWindow;

app.on("ready", async () => {
  win = new BrowserWindow({ width: 800, height: 600 });
  const nextJSPort = 3000;
  let url = `http://localhost:${nextJSPort}/`;

  if (process.env.NODE_ENV !== "development") {
    const nextJSPort = await getPort({ portRange: [30_011, 50_000] });
    const webDir = path.join(path.dirname(path.dirname(app.getAppPath())), "web");

    try {
      await startServer({
        dir: webDir,
        isDev: false,
        hostname: "localhost",
        port: nextJSPort,
        customServer: true,
        allowRetry: false,
      });
      url = `http://localhost:${nextJSPort}/`;
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }

  win.loadURL(url);
  win.show();

  win.webContents.openDevTools();
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);
