import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import createValidations from './create-validations.js';

export default function createChangeset(formFields, data, customValidators) {
  data = data || {};
  var validationsMap = createValidations(formFields, customValidators);

  const fieldsWithDefaults = formFields.filter((field) => field.defaultValue);
  fieldsWithDefaults.forEach((field) => {
    if (!Object.prototype.hasOwnProperty.call(data, field.propertyName)) {
      data[field.propertyName] = field.defaultValue;
    }
  });

  var changeset = Changeset(
    data,
    lookupValidator(validationsMap),
    validationsMap,
    { skipValidate: true },
  );
  return changeset;
}
