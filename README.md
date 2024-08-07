# NextJS App Router with Electron, SSR, Server Components, etc.

![nextjsimage](https://raw.githubusercontent.com/spa5k/nextjs_approuter_electron/main/public/nextjs_electron.png)

This boilerplate demonstrates a turborepo setup combining Next.js with Electron, allowing you to use the same codebase with SSR (Server-Side Rendering)/ React Server Components(RSC) for Electron applications.

![nextjsimage](https://raw.githubusercontent.com/spa5k/nextjs_approuter_electron/main/public/app.png)

## Project Structure

1. **Next.js App** - `next.config.mjs`
   - For the Next.js app, configure it by setting the output to "standalone":
     ```diff
     /** @type {import('next').NextConfig} */
     module.exports = {
       transpilePackages: ["@nextelectron/ui"],
     + output: "standalone",
     };
     ```
   - This configuration produces a minimal bundle usable in Electron. Additionally, this output can be utilized in a Dockerfile to create a containerized version of your app, which is small in size and can run anywhere, not just Vercel.

2. **Electron App** - `package.json`
   - The Electron app uses the Next.js app as the renderer, relying on stock Electron without external libraries.
   - Electron `build` configuration in `package.json`:
     ```json
     "build": {
       "asar": true,
       "executableName": "NextJSElectron",
       "appId": "com.saybackend.nextjs-electron",
       "asarUnpack": [
         "node_modules/next",
         "node_modules/@img",
         "node_modules/sharp",
         "**\\*.{node,dll}"
       ],
       "files": [
         "build",
         {
           "from": ".next/standalone",
           "to": "app",
           "filter": [
             "!**/.env",
             "!**/package.json"
           ]
         },
         {
           "from": ".next/static",
           "to": "app/.next/static"
         },
         {
           "from": "public",
           "to": "app/public"
         }
       ],
       "win": {
         "target": [
           "nsis"
         ]
       },
       "linux": {
         "target": [
           "deb"
         ],
         "category": "Development"
       }
     }
     ```
   - The Next.js app output is copied to the Electron app to be used as the renderer during the build process.
   - Main Electron file (`main.ts`):
     ```ts
     import { is } from "@electron-toolkit/utils";
     import { app, BrowserWindow, ipcMain } from "electron";
     import { getPort } from "get-port-please";
     import { startServer } from "next/dist/server/lib/start-server";
     import { join } from "path";

     const createWindow = () => {
       const mainWindow = new BrowserWindow({
         width: 900,
         height: 670,
         webPreferences: {
           preload: join(__dirname, "preload.js"),
           nodeIntegration: true,
         },
       });

       mainWindow.on("ready-to-show", () => mainWindow.show());

       const loadURL = async () => {
         if (is.dev) {
           mainWindow.loadURL("http://localhost:3000");
         } else {
           try {
             const port = await startNextJSServer();
             console.log("Next.js server started on port:", port);
             mainWindow.loadURL(`http://localhost:${port}`);
           } catch (error) {
             console.error("Error starting Next.js server:", error);
           }
         }
       };

       loadURL();
       return mainWindow;
     };

     const startNextJSServer = async () => {
       try {
         const nextJSPort = await getPort({ portRange: [30_011, 50_000] });
         const webDir = join(app.getAppPath(), "app");

         await startServer({
           dir: webDir,
           isDev: false,
           hostname: "localhost",
           port: nextJSPort,
           customServer: true,
           allowRetry: false,
           keepAliveTimeout: 5000,
           minimalMode: true,
         });

         return nextJSPort;
       } catch (error) {
         console.error("Error starting Next.js server:", error);
         throw error;
       }
     };

     app.whenReady().then(() => {
       createWindow();

       ipcMain.on("ping", () => console.log("pong"));
       app.on("activate", () => {
         if (BrowserWindow.getAllWindows().length === 0) createWindow();
       });
     });

     app.on("window-all-closed", () => {
       if (process.platform !== "darwin") app.quit();
     });
     ```
   - Unlike traditional Electron setups where `index.html` is loaded, this setup runs the Next.js app on a different port and loads it, enabling SSR in Electron.
   - `get-port-please` is used to get a free port, starting the Next.js server on that port. This allows the same codebase to be used for both web and Electron.

## Running the Application

To run the application, use the following commands:

```bash
make next_dev
make electron_dev
```

To build the Electron app:

```bash
make electron_dist
```

> **Note**: Electron expects the Next.js app's production output to be present and copied to the Electron app. Ensure you have built the Next.js app before running the Electron app.

## Makefile

### Next.js Tasks

- **Development Server**: Starts the development server for Next.js.
  ```sh
  make next_dev
  ```

- **Build**: Builds the Next.js project for production.
  ```sh
  make next_build
  ```

- **Start**: Starts the Next.js project.
  ```sh
  make next_start
  ```

- **Lint**: Lints the Next.js project.
  ```sh
  make next_lint
  ```

### Code Formatting

- **Format Code**: Formats the codebase using `dprint`.
  ```sh
  make format
  ```

### Electron Tasks

- **Postinstall**: Installs app dependencies for Electron.
  ```sh
  make postinstall
  ```

- **Build for Distribution**: Builds Electron for distribution in directory mode.
  ```sh
  make electron_dist
  ```

- **Build for Debian Distribution**: Builds Electron for Debian distribution.
  ```sh
  make electron_dist_deb
  ```

- **Build Using tsup**: Builds Electron using `tsup`.
  ```sh
  make electron_build
  ```

- **Watch Mode**: Watch mode for Electron with `tsup`.
  ```sh
  make electron_build_watch
  ```

- **Development Mode**: Starts development mode for Electron.
  ```sh
  make electron_dev
  ```

### Composite Tasks

- **Build All**: Builds both Next.js and Electron projects.
  ```sh
  make build
  ```

- **Distribute All**: Distributes both Next.js and Electron projects.
  ```sh
  make dist
  ```

- **Development Mode for All**: Starts development mode for both Electron and Next.js.
  ```sh
  make dev
  ```

### Usage

To use any of the tasks, simply run the corresponding `make` command in your terminal. For example, to start the development server for Next.js, you would run:

```sh
make next_dev
```

For a list of all available tasks, you can run:

```sh
make help
```

This will display a summary of all tasks and their descriptions.

## Additional Information

- Ensure all dependencies are installed using `pnpm` before running the tasks.
- The tasks are defined in the `Makefile` for ease of use and to maintain consistency across development and build processes.
