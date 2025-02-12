import validateClone from '../validators/cloned.js';
import validateUniqueClone from '../validators/unique-clone.js';
import { unflatten } from 'flat';
import { validateDate, validatePresence, validateLength, validateNumber, validateFormat, validateInclusion, validateExclusion, validateConfirmation } from 'ember-changeset-validations/validators';

// import defaultValidators from 'ember-changeset-validations/validators';
const defaultValidators = {
  validateDate,
  validatePresence,
  validateLength,
  validateNumber,
  validateFormat,
  validateInclusion,
  validateExclusion,
  validateConfirmation
};
function createValidations(fields, customValidators = {}) {
  defaultValidators.validateClone = validateClone;
  defaultValidators.uniqueClone = validateUniqueClone;
  var validations = {};
  if (!fields) {
    return validations;
  }
  fields.forEach(field => {
    field.propertyName = field.propertyName || field.fieldId;
    if (!field.validationRules) {
      return;
    }
    var fieldValidations = [];
    field.validationRules.forEach(rule => {
      var validator = customValidators[rule.validationMethod] || defaultValidators[rule.validationMethod];
      if (!validator) {
        return;
      }
      fieldValidations.push(validator(rule.arguments));
    });
    validations[field.propertyName] = fieldValidations;
  });
  return unflatten(validations);
}

export { createValidations as default };
//# sourceMappingURL=create-validations.js.map
