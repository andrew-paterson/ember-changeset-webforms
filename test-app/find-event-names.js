const fs = require('fs');
const path = require('path');
const targetPaths = [
  '../ember-changeset-webforms/src/components/ember-changeset-webforms/fields',
  '../ember-changeset-webforms/src/components/background',
];
const excludeFilters = [
  '={{@onUserInteraction}}',
  'onUserInteraction(eventName',
  'if (this.args.onUserInteraction) {',
];

const fieldTypeComponentPathMap = [
  {
    fieldType: 'input',
    paths: ['components/ember-changeset-webforms/fields/input.hbs'],
  },
  { fieldType: 'clone-group', paths: [] },
  {
    fieldType: 'textarea',
    paths: ['components/ember-changeset-webforms/fields/textarea.hbs'],
  },
  {
    fieldType: 'powerSelect',
    paths: ['components/ember-changeset-webforms/fields/power-select.js'],
  },
  {
    fieldType: 'powerDatePicker',
    paths: ['components/background/power-datetime-picker.js'],
  },
  {
    fieldType: 'singleCheckbox',
    paths: ['components/ember-changeset-webforms/fields/checkbox.js'],
  },
  {
    fieldType: 'radioButtonGroup',
    paths: ['components/ember-changeset-webforms/fields/radio-button-group.js'],
  },
  {
    fieldType: 'checkboxGroup',
    paths: [
      'components/ember-changeset-webforms/fields/checkbox-group.js',
      'components/ember-changeset-webforms/fields/checkbox.js',
    ],
  },
  {
    fieldType: 'powerSelectCheckboxes',
    paths: [
      'components/ember-changeset-webforms/fields/power-select-checkboxes.js',
    ],
  },
];

const targetDirectories = targetPaths.map((targetPath) =>
  path.resolve(__dirname, targetPath),
);
const searchString = 'onUserInteraction';
const results = [];

// Function which removes all non alpha-numeric characters except underscores
function removeSpecialCharacters(str) {
  return str.replace(/[^a-zA-Z0-9_]/g, '');
}

// Function to recursively read all files in a directory
function readFilesInDirectory(directory) {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const fullPath = path.join(directory, file);
    const relativePath = path.relative(__dirname, fullPath);

    if (fs.statSync(fullPath).isDirectory()) {
      // If it's a directory, recursively read its contents
      readFilesInDirectory(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.hbs')) {
      // If it's a JavaScript file, process it
      const fileContent = fs.readFileSync(fullPath, 'utf8');
      const lines = fileContent.split('\n');

      lines.forEach((line, index) => {
        if (line.includes(searchString)) {
          let lineContent = line.trim();
          if (lineContent.endsWith('(')) {
            lineContent = `${lineContent}${lines[index + 1].trim()}`;
          }

          (lineContent = lineContent.replace(/"+/g, "'")),
            results.push({
              line: lineContent,
              fieldTypes: (
                fieldTypeComponentPathMap.filter((item) => {
                  return item.paths.some((componentPath) =>
                    relativePath.includes(componentPath),
                  );
                }) || []
              ).map((item) => item.fieldType),
              eventName: removeSpecialCharacters(
                lineContent.split('onUserInteraction')[1].trim().split(' ')[0],
              ),
              file: relativePath,
              lineNumber: index + 1,
            });
        }
      });
    }
  });
}
targetDirectories.forEach((targetDirectory) => {
  readFilesInDirectory(targetDirectory);
});
// Start processing the target directory

const filteredResults = results.filter((result) =>
  excludeFilters.every((filter) => !result.line.includes(filter)),
);

// Output the results
const perFieldType = {};

filteredResults.forEach((result) => {
  result.fieldTypes.forEach((fieldType) => {
    const existing = perFieldType[fieldType];
    if (!existing) {
      perFieldType[fieldType] = [];
    }
    if (!perFieldType[fieldType].includes(result.eventName)) {
      perFieldType[fieldType].push(result.eventName);
    }
  });
});

fs.writeFileSync(
  './app/utils/event-names-from-function-calls.js',
  `export default ${JSON.stringify(perFieldType, null, 2)}`,
  'utf8',
);

console.log(
  'Event names extracted from onUserInteraction callbacks and saved to ./app/utils/event-names-from-function-calls.js',
);
