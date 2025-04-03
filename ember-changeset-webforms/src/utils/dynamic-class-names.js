import _mergeWith from 'lodash.mergewith';
import mergeWithArrayInheritanceCustomiser from './merge-with-array-inheritance-customiser.js';

export default function dynamicClassNames(
  elementTypesString,
  changesetWebform,
  formField,
  options = {},
) {
  let classNames = [];

  if (!changesetWebform) {
    return;
  }
  const elementTypes = elementTypesString.split(',');
  elementTypes.forEach((elementType) => {
    let classNameSettings =
      changesetWebform.formSchemaWithDefaults.classNameSettings;
    if (formField && (formField.classNames || {})[elementType]) {
      const formFieldClassNames = {};
      formFieldClassNames[elementType] =
        formField.classNames[elementType] || [];
      classNameSettings = _mergeWith(
        {},
        classNameSettings,
        formFieldClassNames,
        mergeWithArrayInheritanceCustomiser,
      );
    }
    let classNamesArray;
    classNamesArray = classNameSettings[elementType] || [];
    if (
      classNameSettings[`${elementType}Fn`] &&
      typeof classNameSettings[`${elementType}Fn`] === 'function'
    ) {
      classNamesArray =
        classNameSettings[`${elementType}Fn`](
          classNamesArray,
          classNameSettings,
          changesetWebform,
          formField,
        ) || [];
    }
    if (formField && classNamesArray.indexOf('$validationClassNames') > -1) {
      if (formField.validationStatus === 'valid') {
        classNames = classNames.concat(classNameSettings.validClassNames || []);
      } else if (formField.validationStatus === 'invalid') {
        classNames = classNames.concat(
          classNameSettings.invalidClassNames || [],
        );
      }
    }
    if (changesetWebform.debug) {
      classNamesArray.unshift(`[$DEBUG-${elementType.replace(/,/g, '--')}]`);
    }
    classNames = classNames.concat(classNamesArray);
  });

  return classNames.filter((className) => !className.startsWith('$')).join(' ');
}
