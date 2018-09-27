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
  console.log(options);
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
