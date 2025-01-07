// import defaultValidators from 'ember-changeset-validations/validators';
import clonedValidator from '../validators/cloned';
import uniqueCloneValidator from '../validators/unique-clone';
import { unflatten } from 'flat';

import {
  validateDate,
  validatePresence,
  validateLength,
  validateNumber,
  validateFormat,
  validateInclusion,
  validateExclusion,
  validateConfirmation,
} from 'ember-changeset-validations/validators';

const defaultValidators = {
  validateDate,
  validatePresence,
  validateLength,
  validateNumber,
  validateFormat,
  validateInclusion,
  validateExclusion,
  validateConfirmation,
};

export default function createValidations(fields, customValidators = {}) {
  defaultValidators.validateClone = clonedValidator;
  defaultValidators.uniqueClone = uniqueCloneValidator;
  var validations = {};
  if (!fields) {
    return validations;
  }
  fields.forEach((field) => {
    field.propertyName = field.propertyName || field.fieldId;
    if (!field.validationRules) {
      return;
    }

    var fieldValidations = [];
    field.validationRules.forEach((rule) => {
      var validator =
        customValidators[rule.validationMethod] ||
        defaultValidators[rule.validationMethod];
      if (!validator) {
        return;
      }
      fieldValidations.push(validator(rule.arguments));
    });
    validations[field.propertyName] = fieldValidations;
  });
  return unflatten(validations);
}
