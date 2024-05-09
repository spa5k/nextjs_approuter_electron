# NextJS App Router with Electron, SSR, Server Components etc

This boilerplate shows the turborepo setup for NextJS alongside Electron, so that you can use same codebase, with SSR (no export or static drama) for Electron.


1. NextJS App - `apps/web` 
  For the NextJS, we needed to make few changes to the config, set the output to "standalone"

```diff
/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@nextelectron/ui"],
+ output: "standalone",
};
```

This will give us a minimal bundle, which we can use in Electron. Not only that, you can also use this output in your Dockerfile to create a containerized version of your app. Which is small in size, and can run anywhere, not just vercel.

2. Electron App - `apps/electron`
  This is the electron app, which uses the NextJS app as the renderer. We won't be using any external library, it's stock Electron.


```json
"build": {
  "asar": true,
  "executableName": "NextJSElectron",
  "files": [
    "main"
  ],
  "extraFiles": [
    {
      "from": "../web/.next/standalone/apps/web",
      "to": "web"
    },
    {
      "from": "../web/.next/static",
      "to": "web/.next/static"
    },
    {
      "from": "../web/public",
      "to": "web/public"
    }
  ]
}
```
As you can see, we are copying the NextJS app output to the electron app, so that it can be used as the renderer.

For the main.ts file of electron, this is how you are gonna set it up - 

```ts
import { app, BrowserWindow } from "electron";
import { getPort } from "get-port-please";
import { startServer } from "next/dist/server/lib/start-server";
import * as path from "path";

let win: BrowserWindow;

app.on("ready", async () => {
  const nextJSPort = await getPort({ portRange: [30_011, 50_000] });
  const url = `http://localhost:${nextJSPort}/`;
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
  win.loadURL(url);
  win.show();
});
```

It's not same as other electron setups, where we point to index.html, instead we are pointing to the NextJS app, which is running on a different port. This is how we can use SSR in Electron.

You can use get-port-please to get a free port, and then start the NextJS server on that port. This way, you can use the same codebase for both web and electron.

3. In order to run the application, you can use the following commands - 

```bash
make dev
```

4. To build the electron app, you can use the following command - 

```bash
make bundle
```

> Note: Electron expects that you have already created production output of the NextJS app, which is copied to the electron app. So, make sure you have run `make build` in the NextJS app before running the electron app.