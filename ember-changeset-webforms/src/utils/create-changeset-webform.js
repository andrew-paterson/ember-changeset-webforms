import ChangesetWebform from './changeset-webform-class.js';

export default function createChangesetWebform(
  appDefaults,
  formSchema,
  data,
  customValidators,
  dynamicIncludeExcludeConditions,
  onFormSubmit,
  debug,
) {
  const changesetWebform = new ChangesetWebform(
    appDefaults,
    formSchema,
    data,
    customValidators,
    dynamicIncludeExcludeConditions,
    onFormSubmit,
    debug,
  );
  if (changesetWebform.debug) {
    console.log(
      '[Ember Changeset Webforms] DEBUG changesetWebform object',
      changesetWebform,
    );
  }
  return changesetWebform;
}
