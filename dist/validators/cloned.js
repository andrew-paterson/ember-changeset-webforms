import { validateDate, validatePresence, validateLength, validateNumber, validateFormat, validateInclusion, validateExclusion, validateConfirmation } from 'ember-changeset-validations/validators';
import validateUniqueClone from './unique-clone.js';

// import defaultValidators from 'ember-changeset-validations/validators';
// TODO custom validators must be added here and integrated

const defaultValidators = {
  validateDate,
  validatePresence,
  validateLength,
  validateNumber,
  validateFormat,
  validateInclusion,
  validateExclusion,
  validateConfirmation,
  uniqueClone: validateUniqueClone
};
function validateClone(options = {}) {
  return (key, newValue, oldValue, changes, content) => {
    var allCloneValidations = [];
    options.validationRules = options.validationRules || [];
    newValue = newValue || [];
    newValue.forEach((item, index) => {
      if ((options.validationRules[0] && options.validationRules[0].activateValidation || []).indexOf(index) < 0) {
        allCloneValidations.push([]);
        return;
      }
      var thisCloneValidations = [];
      options.validationRules.forEach(cloneValidation => {
        var func;
        if (defaultValidators[cloneValidation.validationMethod]) {
          func = defaultValidators[cloneValidation.validationMethod](cloneValidation.arguments);
        } else {
          func = options.customValidators[cloneValidation.validationMethod](cloneValidation.arguments);
        }
        var validationResult = func(key, item, oldValue, changes, content);
        if (validationResult !== true) {
          thisCloneValidations.push(validationResult);
        }
      });
      if (thisCloneValidations.every(item => {
        return item === true;
      })) {
        thisCloneValidations = [];
      }
      allCloneValidations.push(thisCloneValidations);
    });
    if (allCloneValidations.every(item => {
      return item.length === 0;
    })) {
      return true;
    }
    return {
      clones: allCloneValidations
    };
  };
}

export { validateClone as default };
//# sourceMappingURL=cloned.js.map
