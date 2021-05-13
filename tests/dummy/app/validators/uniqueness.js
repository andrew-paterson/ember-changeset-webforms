//BEGIN-SNIPPET uniqueness-validator.js
// validators/uniqueness.js
import { assign } from '@ember/polyfills';

export default function validateUniqueness(opts) {
  return (key, newValue, oldValue, changes, content) => {
    var current = assign(content, changes);  
    var response = true; 
    opts.descriptionsMap = opts.descriptionsMap || {};
    const fieldName = opts.descriptionsMap[key] || key;
    for (var itemKey in current) {
      const otherfieldName = opts.descriptionsMap[itemKey] || itemKey;
      if (current[itemKey] === newValue && itemKey != key) {
       response = `Each field must be unique- ${fieldName} is the same as ${otherfieldName}.`;
      }
    } 
    return response;
  };
}
//END-SNIPPET