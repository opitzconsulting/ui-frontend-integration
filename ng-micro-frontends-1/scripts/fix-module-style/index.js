const moduleName = process.argv[2];
console.log(`fixing view encapsulation for module ${moduleName}...`);

const fs = require("fs");
const path = require("path");
const staticPath = path.join(
  __dirname,
  `./../../${moduleName}/runtime/static/`
);

if (!fs.existsSync(staticPath + "main.js")) {
  console.error(`file ${staticPath}main.js does not exist!`);
  process.exit(1);
}

fs.readFile(staticPath + "main.js", "utf8", (err, data) => {
  if (err) {
    return console.error(err);
  }
  let f = data;
  f = f.replace(/_ngcontent/g, "_ngcontent-" + moduleName);
  f = f.replace(/_nghost/g, "_nghost-" + moduleName);
  fs.writeFile(staticPath + "main.js", f, "utf8", err => console.error(err));
});
