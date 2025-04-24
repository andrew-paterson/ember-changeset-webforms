import _mergeWith from 'lodash.mergewith';
import mergeWithArrayInheritanceCustomiser from './merge-with-array-inheritance-customiser.js';

export default function getWithDefault(defaults = [], formSchema = {}) {
  const fieldSettingsDefaults = defaults.map((item) => item.fieldSettings);
  const formSettingsDefaults = defaults.map((item) => item.formSettings);
  const classNamesDefaults = defaults.map((item) => item.classNames);
  const validatorsDefaults = defaults.map((item) => item.validators);

  const formSettings = _mergeWith(
    {},
    ...formSettingsDefaults,
    formSchema.formSettings,
  );
  const classNameSettings = _mergeWith(
    {},
    ...classNamesDefaults,
    formSchema.classNames,
    mergeWithArrayInheritanceCustomiser,
  );

  const validators = _mergeWith(
    {},
    ...validatorsDefaults,
    formSchema.validators,
  );

  const mergedFields = (formSchema.fields || []).map((field) => {
    const fieldTypeDefaults = defaults.map((item) => {
      return item.fieldTypes.find(
        (itemFieldType) => itemFieldType.fieldType === field.fieldType,
      );
    });
    const formLevelFieldTypeSettings =
      formSchema.fieldSettings?.fieldTypes?.find(
        (fieldType) => fieldType.fieldType === field.fieldType,
      );

    const mergedField = _mergeWith(
      {},
      ...fieldSettingsDefaults,
      ...fieldTypeDefaults,
      formSchema.fieldSettings,
      formLevelFieldTypeSettings || {},
      field,
      mergeWithArrayInheritanceCustomiser,
    );
    if (!mergedField.alwaysValidateOn.includes('submit')) {
      console.warn(
        `[Ember Changeset Webforms] Field ${field.fieldId} does not validate on submit. This is not recommended. You can either add $inherited or submit to the alwaysValidateOn array. The current value is [${mergedField.alwaysValidateOn}]`,
      );
    }
    if (field.cloneFieldSchema) {
      const cloneFieldDefaults = defaults.reduce((acc, item) => {
        acc.push(item.fieldSettings);
        acc.push(
          item.fieldTypes.find(
            (itemFieldType) =>
              itemFieldType.fieldType === field.cloneFieldSchema.fieldType,
          ),
        );
        return acc;
      }, []);
      const mergedCloneField = _mergeWith(
        {},
        ...cloneFieldDefaults,
        field.cloneFieldSchema,
        mergeWithArrayInheritanceCustomiser,
      );
      mergedField.cloneFieldSchema = mergedCloneField;
    }
    return mergedField;
  });
  return {
    validators: validators,
    classNameSettings: classNameSettings,
    formSettings: formSettings,
    fields: mergedFields,
  };
}
