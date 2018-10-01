const path = require("path");
const fs = require("fs");
const childProcess = require("child_process");

const basePath =
  path
    .dirname(__filename)
    .split(path.sep)
    .slice(0, -2)
    .join(path.sep) + path.sep;

// node.js common utils need also an install
(() => {
  const nodePath = basePath + "common" + path.sep + "node.js" + path.sep;
  if (fs.existsSync(nodePath) && fs.existsSync(nodePath + "package.json")) {
    console.log(`npm install in common/node.js:`);
    childProcess.execSync(`cd ${nodePath} && npm install`);
  }
})();

const modules = fs.readdirSync(basePath);

for (let module of modules) {
  if (module !== "common" && module !== "scripts") {
    const stats = fs.lstatSync(basePath + module);
    if (stats.isDirectory()) {
      const runtimePath = basePath + module + path.sep + "runtime" + path.sep;
      if (
        fs.existsSync(runtimePath) &&
        fs.existsSync(runtimePath + "package.json")
      ) {
        console.log(`npm install in ${module}/runtime:`);
        childProcess.execSync(`cd ${runtimePath} && npm install`);
      }

      const sourcePath =
        basePath + module + path.sep + "source" + path.sep + module + path.sep;
      if (
        fs.existsSync(sourcePath) &&
        fs.existsSync(sourcePath + "package.json")
      ) {
        console.log(`npm install in ${module}/source/${module}:`);
        childProcess.execSync(`cd ${sourcePath} && npm install`);
      }
    }
  }
}
