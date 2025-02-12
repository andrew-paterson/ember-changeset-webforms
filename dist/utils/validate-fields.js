function validateAllowedFields(changesetWebform) {
  var allowedFields = changesetWebform.fields.filter(field => {
    return !field.hidden && !field.dynamicallyExcluded && !field.skipValidation && field.validates;
  }).map(allowedField => {
    allowedField.eventLog.push('submit');
    if (allowedField.clonedFields) {
      // TODO does this really belong in a util.
      allowedField.clonedFields.forEach((clonedField, index) => {
        if (clonedField.validationRules && clonedField.validationRules.length) {
          // TODO DRY this up
          clonedField.validationRules[0].activateValidation = clonedField.validationRules[0].activateValidation || [];
          clonedField.validationRules[0].activateValidation.push(index);
        }
        clonedField.eventLog.push('submit');
      });
      // TODO test for cloned fields without any validation rules
    }
    return allowedField.propertyName;
  });
  var validatePromises = allowedFields.map(allowedField => {
    return changesetWebform.changeset.validate(allowedField);
  });
  return Promise.all(validatePromises);
}

export { validateAllowedFields as default };
//# sourceMappingURL=validate-fields.js.map
