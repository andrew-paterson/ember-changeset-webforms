import classNamesConfigInstance from './class-names-config-instance.js';

export default function setCustomValidity(
  elementTypesString,
  changesetWebform,
  formField,
) {
  if (!changesetWebform) {
    return;
  }
  const classNamesArray = classNamesConfigInstance(
    elementTypesString,
    changesetWebform,
    formField,
  );
  return classNamesArray.includes('$validationPseudoClasses');
}
