import _mergeWith from 'lodash.mergewith';

export default function (elementType, changesetWebform, formField) {
  const appAttrFunctions =
    changesetWebform.formSchemaWithDefaults.attrFunctions;
  const formFieldAttrFunctions = {};
  if (formField && (formField.attrFunctions || {})[elementType]) {
    formFieldAttrFunctions[elementType] =
      formField.attrFunctions[elementType] || [];
  }
  return _mergeWith({}, appAttrFunctions, formFieldAttrFunctions);
}
