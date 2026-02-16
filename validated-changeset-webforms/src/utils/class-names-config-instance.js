import mergedClassNameSettings from './merged-class-name-settings.js';

export default (elementTypesString, changesetWebform, formField, element) => {
  if (!changesetWebform) {
    return;
  }
  const elementTypes = elementTypesString.split(',');
  return elementTypes
    .reduce((accumulatedClassNames, elementType) => {
      let classNameSettings = mergedClassNameSettings(
        elementType,
        changesetWebform,
        formField,
      );

      accumulatedClassNames = accumulatedClassNames.concat(
        classNameSettings[elementType] || [],
      );

      return accumulatedClassNames;
    }, [])
    .map((item) => item.trim());
};
