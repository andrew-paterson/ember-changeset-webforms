import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import createValidations from './create-validations.js';

export default function createChangeset(formFields, data, customValidators) {
  data = data || {};
  var validationsMap = createValidations(formFields, customValidators);
  var changeset = Changeset(
    data,
    lookupValidator(validationsMap),
    validationsMap,
    { skipValidate: true },
  );
  return changeset;
}
