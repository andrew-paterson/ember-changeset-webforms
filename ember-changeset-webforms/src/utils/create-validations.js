import clonedValidator from '../validators/cloned.js';
import uniqueCloneValidator from '../validators/unique-clone.js';
import { unflatten } from 'flat';

export default function createValidations(fields, validators = {}) {
  validators.validateClone = clonedValidator;
  validators.uniqueClone = uniqueCloneValidator;
  var validations = {};
  if (!fields) {
    return validations;
  }
  fields.forEach((field) => {
    field.propertyName = field.propertyName || field.fieldId;
    if (!field.validationRules) {
      return;
    }
    if ((field.clonedFieldBlueprint || {}).validationRules) {
      field.validationRules = field.validationRules || [];
      field.validationRules.unshift({
        validationMethod: 'validateClone',
        arguments: {
          validationRules: field.clonedFieldBlueprint.validationRules,
          validators: validators, // We add validators as an option here so that they can be accessed from within the cloned validator
        },
      });
    }

    var fieldValidations = [];
    field.validationRules.forEach((rule) => {
      var validator = validators[rule.validationMethod];
      if (!validator) {
        return;
      }
      fieldValidations.push(validator(rule.arguments));
    });
    validations[field.propertyName] = fieldValidations;
  });
  return unflatten(validations);
}
