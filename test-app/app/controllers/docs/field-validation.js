import Controller from '@ember/controller';
import { addonDefaults } from 'ember-changeset-webforms/utils/get-with-default';

export default class Fieldvalidation extends Controller {
  addonDefaults = addonDefaults;

  get obj() {
    return filterObjectKeys(addonDefaults);
  }

  get fieldSettingsValidateOn() {
    return this.obj.fieldSettings?.validateOn || [];
  }

  get fieldSettingsValidateOnString() {
    const string = JSON.stringify(this.obj, null, 2);
    return string
      .split('\n')
      .map((line) => {
        if (line.indexOf('$inherited') > -1) {
          return `${line} // Inherits 'submit' from fieldSettings above`;
        }
        return line;
      })
      .join('\n');
  }
}

function filterObjectKeys(addonDefaults) {
  function filterKeys(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return null;
    }
    const result = {};
    for (const key in obj) {
      if (key === 'alwaysValidateOn' || key === 'fieldType') {
        result[key] = obj[key];
      } else if (Array.isArray(obj[key])) {
        const test = obj[key]
          .map((item) => {
            const nestedResult = filterKeys(item);
            return nestedResult;
          })
          .filter((item) => item !== null);
        if (test.length > 0) {
          result[key] = test;
        }
      } else if (typeof obj[key] === 'object') {
        const nestedResult = filterKeys(obj[key]);
        if (nestedResult && Object.keys(nestedResult).length > 0) {
          result[key] = nestedResult;
        }
      }
    }
    return result;
  }
  return filterKeys(addonDefaults);
}
