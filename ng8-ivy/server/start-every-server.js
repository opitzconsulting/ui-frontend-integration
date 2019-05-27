// Includes
const path = require('path');
const fs = require('fs');
const fork = require('child_process').fork;
// Initialize Log method
const log = (srv, msg) =>
  console.log(
    `${new Date().toISOString()} ${srv ? '[' + srv + '] ' : ''}${(
      '' + msg
    ).trim()}`
  );
const err = (srv, msg) => {
  console.error(
    `${new Date().toISOString()} ${srv ? '[' + srv + '] ' : ''}${(
      '' + msg
    ).trim()}`
  );
};
// exit
const idleLoop = setInterval(() => log('', `noop`), 60 * 1000);

let terminating = false;
const terminate = () => {
  if (terminating !== false) return;
  terminating = true;
  log('', `terminating process...`);
  clearInterval(idleLoop);
  // kill servers
  for (let i = 1; i < servers.length; ++i) {
    const server = servers[i];
    log('', `stopping ${server.name} server...`);
    server.instance.kill('SIGINT');
  }
  let timeout = setTimeout(() => {
    clearTimeout(timeout);

    const server = servers[0];
    log('', `stopping ${server.name} server...`);
    server.instance.kill('SIGINT');

    timeout = setTimeout(() => {
      log('', 'almost done. bye.');
      process.exit(0);
    }, 1000);
  }, 1000);
};
process.on('SIGINT', terminate);
// Parse Parameters
const params = {
  develop: null,
  liveServerPort: null
};
let i = 0;
while (i < process.argv.length) {
  const cmd = process.argv[i];
  const value = process.argv[i + 1];
  switch (cmd) {
    case '--develop':
      if (value !== undefined && value !== null && value !== '') {
        params.develop = value;
        ++i;
      }
      break;
    case '--live-server-port':
      if (value !== undefined && value !== null && value !== '') {
        params.liveServerPort = parseInt(value, 10);
        ++i;
      }
      break;
  }
  ++i;
}
if (!params.develop) {
  console.log(` `);
  console.log(
    ` For development you can avoid starting a server by using this script with parameter --develop and modul name: e.g. --develop product`
  );
  console.log(
    ` Additional, when serving a module from a live server (by using ng serve), you can set the parameter --live-server-port 4200 to detect file changes and automatically reload.`
  );
  console.log(` `);
  params.liveServerPort = null;
}

// Determinate base path
const basePath =
  path
    .dirname(__filename)
    .split(path.sep)
    .slice(0, -1)
    .join(path.sep) + path.sep;

// List Module Servers
let servers = [
  {
    name: 'root',
    path: basePath + 'server' + path.sep + 'index.js',
    instance: null
  }
];
(() => {
  const folders = fs.readdirSync(basePath + 'projects' + path.sep);
  console.log(folders);
  for (let i = folders.length - 1; i >= 0; --i) {
    const folder = folders[i];
    const stats = fs.lstatSync(basePath + 'projects' + path.sep + folder);
    if (folder === 'root' || folder === 'scripts' || !stats.isDirectory()) {
      folders.splice(i, 1);
    } else {
      if (folder !== params.develop) {
        const filePath =
          basePath + 'projects' + path.sep + folder + path.sep + 'server' + path.sep + 'index.js';
        if (fs.existsSync(filePath)) {
          servers.push({ name: folder, path: filePath, instance: null });
        }
      }
    }
  }
})();
// Start Servers
log('', `starting servers...`);
let lastTimeout = null;
const startServer = server => {
  log('', `starting ${server.name} server (${server.path})`);
  let serverParams = [];
  if (server.name === 'root' && params.liveServerPort) {
    serverParams.push('--live-server-port');
    serverParams.push(params.liveServerPort);
  }
  server.instance = fork(server.path, serverParams, { stdio: 'pipe' });
  server.instance.stdout.on('data', data => log(server.name, data));
  server.instance.stderr.on('data', buffer => err(buffer.toString('ascii')));
};
// Delayed start other servers
const startServerList = index => {
  clearTimeout(lastTimeout);
  startServer(servers[index]);
  if (index < servers.length - 1) {
    lastTimeout = setTimeout(() => startServerList(index + 1), 1000);
  } else {
    lastTimeout = setTimeout(() => {
      log('', `initialization done, press ctrl + c to exit`);
      clearTimeout(lastTimeout);
      developInfo();
    }, 1000);
  }
};
startServerList(0);

const developInfo = () => {
  if (params.develop) {
    console.log(` `);
    console.log(` Starting server for ${params.develop} was skipped.`);
    console.log(
      ` Run server manually for development by using following command:`
    );
    console.log(
      `  node ${basePath +
        params.develop +
        path.sep +
        'runtime' +
        path.sep +
        'index.js'}`
    );
    console.log(
      ` You can use a live server for serving static files by defining the port, for e.g.: `
    );
    console.log(
      `  node ${basePath +
        params.develop +
        path.sep +
        'runtime' +
        path.sep +
        'index.js'} --static-server-port 4200`
    );
    console.log(` `);
  }
};
