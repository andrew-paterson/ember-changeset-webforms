import createChangeset from './create-changeset.js';
import getWithDefaultUtil from './get-with-default.js';
import parseChangesetWebformField from './parse-changeset-webform-field.js';
import validateFields from './validate-fields.js';
import FormSettings from './form-settings.js';

export default function createChangesetWebform(
  appDefaults,
  formSchema,
  data,
  customValidators,
  opts,
) {
  const formSchemaWithDefaults = getWithDefaultUtil(appDefaults, formSchema);
  const parsedFields = formSchemaWithDefaults.fields.map((field) =>
    parseChangesetWebformField(
      field,
      customValidators,
      formSchemaWithDefaults.formSettings,
    ),
  );
  const changeset = createChangeset(parsedFields, data, customValidators, opts);
  parsedFields.forEach((formField) => {
    formField.changeset = changeset;
    formField.applyDefaultValue();
  });
  return {
    changeset: changeset,
    fields: parsedFields,
    formSettings: new FormSettings(formSchemaWithDefaults.formSettings),
    formSchema: { ...formSchema },
    formSchemaWithDefaults: { ...formSchemaWithDefaults },
    showField(fieldId) {
      const field = this.fields.find((field) => field.fieldId === fieldId);
      field.hidden = false;
    },
    hideField(fieldId) {
      const field = this.fields.find((field) => field.fieldId === fieldId);
      if (field.resetWhenRemoved) {
        field.reset();
      }
      field.hidden = true;
    },
    validateFields() {
      return validateFields(this);
    },
  };
}
