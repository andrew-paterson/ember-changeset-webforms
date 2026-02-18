import createChangeset from './create-changeset.js';
import parseChangesetWebformField from './parse-changeset-webform-field.js';
import FormSettings from './form-settings.js';

export default function createChangesetWebformProps(
  instance,
  data,
  opts = {},
  modules,
) {
  const parsedFields = instance.formSchemaWithDefaults.fields.map((field) =>
    parseChangesetWebformField(
      field,
      instance.formSchemaWithDefaults.formSettings.formName,
      modules,
    ),
  );

  const changeset =
    instance.changeset ||
    createChangeset(
      parsedFields,
      data,
      instance.formSchemaWithDefaults.validators,
      opts.ignoreDefaultValues,
      modules.Changeset,
    );

  const snapshots = [];
  parsedFields.forEach((formField, index) => {
    formField.index = index;
    formField.siblings = parsedFields.filter(
      (field) => field.fieldId !== formField.fieldId,
    );
    formField.dynamicIncludeExcludeConditions =
      instance.dynamicIncludeExcludeConditions;
    formField.snapshots = snapshots;
    formField.changeset = changeset; // TODO remove this
    formField.changesetWebform = instance;
    formField._checkOmitted();
    // We set changeset props to null if they have no initial values. This ensurs that validators such as uniqueness work, and that all keys are sent in the payload.
  });
  const FormSettingsModule = modules.FormSettings || FormSettings;
  return {
    changeset: changeset,
    parsedFields: parsedFields,
    snapshots: snapshots,
    formSettings: new FormSettingsModule(
      instance.formSchemaWithDefaults.formSettings,
    ),
  };
}
