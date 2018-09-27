console.log("starting server...");

const express = require("express");
const path = require("path");
const http = require("http");

const port = 8000;

const app = express();
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
app.listen(port, () =>
  console.log(`server started on port ${port} successfully.`)
);

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
  });
});

app.delete("/api/apps/:appname", (req, res) => {
  const appName = req.params.appname;
  removeApp(appName);
  res.json({ success: true });
});
