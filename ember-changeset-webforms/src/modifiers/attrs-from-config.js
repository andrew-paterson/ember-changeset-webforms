import { modifier } from 'ember-modifier';
import _classNamesFromConfig from 'validated-changeset-webforms/dist/utils/class-names-from-config.js';
import setCustomValidity from 'validated-changeset-webforms/dist/utils/set-custom-validity.js';
import mergedAttrFunctions from 'validated-changeset-webforms/dist/utils/merged-attr-functions.js';

export default modifier((element, [names, changesetWebform, formField]) => {
  if (!changesetWebform) {
    console.warn(
      `[attrs-from-config] - changesetWebform was not passed to the instance of the attrs-from-config modifier with the following as it's first argument: ${names}`,
    );
    return;
  }
  if (
    setCustomValidity(names, changesetWebform, formField) &&
    element.setCustomValidity
  ) {
    element.setAttribute('data-set-custom-validity', true);
  }

  const classNamesFromConfig = _classNamesFromConfig(
    names,
    changesetWebform,
    formField,
    element,
  );
  element.classList.remove(
    ...classNamesFromConfig
      .filter((item) => item.startsWith('!'))
      .map((item) => item.slice(1)),
  );
  if (classNamesFromConfig) {
    element.classList.add(
      ...classNamesFromConfig.filter((item) => !item.startsWith('!')),
    );
  }
  names.split(',').forEach((elementType) => {
    const attrFunctions = mergedAttrFunctions(
      elementType,
      changesetWebform,
      formField,
    );
    if (
      attrFunctions[elementType] &&
      typeof attrFunctions[elementType] === 'function' &&
      element
    ) {
      attrFunctions[elementType](element, changesetWebform, formField);
    }
  });
});
