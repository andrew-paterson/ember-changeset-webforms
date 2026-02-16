import _mergeWith from 'lodash.mergewith';
import mergeWithArrayInheritanceCustomiser from './merge-with-array-inheritance-customiser.js';

export default function (elementType, changesetWebform, formField) {
  const appClassNameSettings =
    changesetWebform.formSchemaWithDefaults.classNameSettings;
  const formFieldClassNames = {};
  if (formField && (formField.attrsFromConfig.classNames || {})[elementType]) {
    formFieldClassNames[elementType] =
      formField.attrsFromConfig.classNames[elementType] || [];
  }
  return _mergeWith(
    {},
    appClassNameSettings,
    formFieldClassNames,
    mergeWithArrayInheritanceCustomiser,
  );
}
