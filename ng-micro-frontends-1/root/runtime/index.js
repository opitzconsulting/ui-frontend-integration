console.log("starting server...");
// Parse Parameters
const params = {
  liveServerPort: null
};
let i = 0;
while (i < process.argv.length) {
  const cmd = process.argv[i];
  switch (cmd) {
    case "--live-server-port":
      const value = process.argv[i + 1];
      if (value !== undefined && value !== null && value !== "") {
        params.liveServerPort = parseInt(value.trim(), 10);
        ++i;
      }
      break;
  }
  ++i;
}

if (params.liveServerPort) {
  console.log(` `);
  console.log(
    ` Using Live-Server http://localhost:${
      params.liveServerPort
    } for change detection and reload strategy`
  );
  console.log(` `);
}

const express = require("express");
const path = require("path");
const request = require("request");

const port = 8000;

const app = express();
const srv = require("http").createServer(app);
const io = require("socket.io")(srv);

// websocket implementation
// currently only the root server use the websocket.
io.on("connection", client => {
  console.log("client connected");
  client.on("disconnect", () => console.log("client disconnected"));
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type, User-Agent"
  );
  next();
});
srv.listen(port, () =>
  console.log(`server started on port ${port} successfully.`)
);

// if live server port is given as an argument, use port to proxy update requests to the live server.
if (params.liveServerPort) {
  app.use((req, res, next) => {
    if (
      /^\/(sockjs-node|__webpack_dev_server__)\/.*/.test(req.originalUrl) ===
      true
    ) {
      let url = "http://localhost:" + params.liveServerPort + req.originalUrl;
      req.pipe(request(url)).pipe(res);
    } else {
      next();
    }
  });
}

const staticPath = path.join(__dirname, "./static");
app.use(express.static(staticPath));

const apps = [];

app.get("/api/apps", (req, res) => {
  res.json({ apps });
});

const removeApp = appName => {
  const idx = apps.map(app => app.name).indexOf(appName);
  if (idx > -1) {
    apps.splice(idx, 1);
    console.log(`App "${appName}" unregistered`);
  }
};

app.post("/api/apps/:appname", (req, res) => {
  const appName = req.params.appname;
  removeApp(appName);
  let body = "",
    app = {};
  req.on("data", chunk => (body += chunk.toString()));
  req.on("end", () => {
    app = JSON.parse(body);
    apps.push(app);
    console.log(`App "${appName}" registered at ${app.host}:${app.port}`);
    res.json({ success: true });
    // emit websocket event, to inform clients that a new app was registered
    io.emit("app-registration", { app: appName, action: "registered" });
  });
});

app.delete("/api/apps/:appname", (req, res) => {
  const appName = req.params.appname;
  removeApp(appName);
  res.json({ success: true });
  // emit websocket event, to inform clients that an app was unregistered
  io.emit("app-registration", { app: appName, action: "unregistered" });
});
