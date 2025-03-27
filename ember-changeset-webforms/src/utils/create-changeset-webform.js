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
  dynamicIncludeExcludeConditions,
) {
  const formSchemaWithDefaults = getWithDefaultUtil(appDefaults, formSchema);
  const parsedFields = formSchemaWithDefaults.fields.map((field) =>
    parseChangesetWebformField(
      field,
      customValidators,
      formSchemaWithDefaults.formSettings,
    ),
  );
  const changeset = createChangeset(parsedFields, data, customValidators);
  parsedFields.forEach((formField, index) => {
    formField.index = index;
    formField.changeset = changeset;
    formField.siblings = parsedFields.filter(
      (field) => field.fieldId !== formField.fieldId,
    );
    formField.dynamicIncludeExcludeConditions = dynamicIncludeExcludeConditions;
    formField.applyDefaultValue();
  });
  return {
    changeset: changeset,
    fields: parsedFields,
    formSettings: new FormSettings(formSchemaWithDefaults.formSettings),
    formSchema: { ...formSchema },
    formSchemaWithDefaults: { ...formSchemaWithDefaults },
    includeField(fieldId) {
      const field = this.fields.find((field) => field.fieldId === fieldId);
      field.omitted = false;
    },
    omitField(fieldId) {
      const field = this.fields.find((field) => field.fieldId === fieldId);
      if (field.resetWhenRemoved) {
        field.reset();
      }
      field.omitted = true;
    },
    validateFields() {
      return validateFields(this);
    },
  };
}
