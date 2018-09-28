const http = require("http");

const registerApp = (
  regHost,
  regPort,
  appName,
  appPort,
  appElement,
  appDescription
) => {
  const data = JSON.stringify({
    name: appName,
    host: regHost,
    port: appPort,
    element: appElement,
    description: appDescription
  });
  const options = {
    host: regHost,
    port: regPort,
    path: "/api/apps/" + appName,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length
    }
  };
  const req = http.request(options, res => {});
  req.write(data);
  req.end();
  req.on("response", res => {
    if (res.statusCode !== 200) {
      console.log(`failed to register server`);
    } else {
      console.log(`server registered successfully`);
    }
  });
};
module.exports.registerApp = registerApp;

const unregisterApp = (regHost, regPort, appName) => {
  //console.log(`unregisterApp(${regHost}, ${regPort}, ${appName})`);
  const options = {
    host: regHost,
    port: regPort,
    path: "/api/apps/" + appName,
    method: "DELETE"
  };
  //console.log(options);
  const req = http.request(options, res => {});
  req.end();
  req.on("response", res => {
    if (res.statusCode !== 200) {
      console.log(`failed to unregister server`);
    } else {
      console.log(`server unregistered successfully`);
    }
  });
};
module.exports.unregisterApp = unregisterApp;

module.exports.startModuleServer = (
  regHost,
  regPort,
  appName,
  appPort,
  appElem,
  appDesc
) => {
  console.log("starting server...");
  // Parse Parameters
  const params = {
    staticServerPort: null
  };
  let i = 0;
  while (i < process.argv.length) {
    const cmd = process.argv[i];
    switch (cmd) {
      case "--static-server-port":
        const value = process.argv[i + 1];
        if (value !== undefined && value !== null && value !== "") {
          params.staticServerPort = parseInt(value.trim(), 10);
          ++i;
        }
        break;
    }
    ++i;
  }

  if (params.staticServerPort) {
    console.log(` `);
    console.log(
      ` Serving static files from http://localhost:${params.staticServerPort}`
    );
    console.log(` `);
  }

  const express = require("express");
  const path = require("path");
  const request = require("request");

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
  app.listen(appPort, () =>
    console.log(`server started on port ${appPort} successfully.`)
  );

  if (params.staticServerPort) {
    app.use((req, res, next) => {
      console.log(req.originalUrl);
      if (/^\/api\/.*/.test(req.originalUrl) === false) {
        let url =
          "http://localhost:" + params.staticServerPort + req.originalUrl;
        req.pipe(request(url)).pipe(res);
      } else {
        next();
      }
    });
  } else {
    const staticPath = path.join(
      __dirname,
      `./../../${appName}/runtime/static`
    );
    console.log(staticPath);
    app.use(express.static(staticPath));
  }

  registerApp(regHost, regPort, appName, appPort, appElem, appDesc);
  process.on("SIGINT", () => {
    unregisterApp(regHost, regPort, appName);
    setTimeout(() => process.exit(0), 1000);
  });

  return app;
};
