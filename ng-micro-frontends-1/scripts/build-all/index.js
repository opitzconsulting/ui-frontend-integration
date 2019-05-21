const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');

const basePath =
  path
    .dirname(__filename)
    .split(path.sep)
    .slice(0, -2)
    .join(path.sep) + path.sep;

const modules = fs.readdirSync(basePath);

for (let module of modules) {
  if (module !== 'common' && module !== 'scripts' && module === 'product') {
    const stats = fs.lstatSync(basePath + module);
    if (stats.isDirectory()) {
      const sourcePath = basePath + module + path.sep + 'source' + path.sep + module + path.sep;
      if (fs.existsSync(sourcePath) && fs.existsSync(sourcePath + 'package.json')) {
        console.log(`npm run build in ${module}/source/${module}:`);
        childProcess.execSync(`cd ${sourcePath} && npm run build`);
        // console.log(`cd ${sourcePath} && npm run build`);
      }
    }
  }
}
