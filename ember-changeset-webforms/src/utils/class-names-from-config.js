import classNamesConfigInstance from './class-names-config-instance.js';

export default function (
  elementTypesString,
  changesetWebform,
  formField,
  element,
) {
  if (!changesetWebform) {
    return;
  }
  let classNamesArray = classNamesConfigInstance(
    elementTypesString,
    changesetWebform,
    formField,
    element,
  );
  const elementTypes = elementTypesString.split(',');
  elementTypes.forEach((elementType) => {
    classNamesArray = applyValidationClassNames(
      changesetWebform,
      formField,
      classNamesArray,
    );
    if (changesetWebform.debug) {
      const debugClass = `[$DEBUG=>configNameSpace===${elementType.replace(/,/g, '--')}]`;
      if (!classNamesArray.includes(debugClass)) {
        classNamesArray.unshift(debugClass);
      }
    }
  });
  return classNamesArray.filter((className) => !className.startsWith('$'));
}

function applyValidationClassNames(
  changesetWebform,
  formField,
  classNamesArray,
) {
  let classNameSettings =
    changesetWebform.formSchemaWithDefaults.classNameSettings;
  if (classNamesArray.includes('$validationClassNames')) {
    classNamesArray = classNamesArray.concat(
      (classNameSettings.validClassNames || []).map((item) => `!${item}`),
    );
    classNamesArray = classNamesArray.concat(
      (classNameSettings.invalidClassNames || []).map((item) => `!${item}`),
    );
    if (formField) {
      if (formField.validationStatus === 'valid') {
        classNamesArray = classNamesArray.concat(
          classNameSettings.validClassNames || [],
        );
      } else if (formField.validationStatus === 'invalid') {
        classNamesArray = classNamesArray.concat(
          classNameSettings.invalidClassNames || [],
        );
      }
    } else {
      if (changesetWebform.changeset.isValid) {
        classNamesArray = classNamesArray.concat(
          classNameSettings.validClassNames || [],
        );
      } else if (changesetWebform.changeset.isInvalid) {
        classNamesArray = classNamesArray.concat(
          classNameSettings.invalidClassNames || [],
        );
      }
    }
  }
  return classNamesArray;
}
