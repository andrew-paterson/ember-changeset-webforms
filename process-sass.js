const sass = require("sass");
const fs = require("fs");
const path = require("path");

const scssFiles = findScssFiles("./ember-changeset-webforms/src/components");

scssFiles.forEach((file) => {
  const result = sass.compile(file, {
    sourceMap: false,
  });
  const outputPath = `${path.basename(file)}.css`;
  const css = `${result.css}\n/*@ sourceMappingURL=${path.basename(outputPath)}.map*/`;
  fs.writeFileSync(outputPath, css);
  if (!file.sourceMap) {
    return;
  }
  fs.writeFileSync(`${outputPath}.map`, JSON.stringify(result.sourceMap));
});

console.log("Sass compiled to CSS.");

function findScssFiles(directory) {
  let scssFiles = [];

  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scssFiles = scssFiles.concat(findScssFiles(fullPath));
    } else if (stat.isFile() && path.extname(file) === ".scss") {
      scssFiles.push(fullPath);
    }
  });

  return scssFiles;
}
