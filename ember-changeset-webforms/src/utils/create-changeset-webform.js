import createChangeset from './create-changeset';
import getWithDefaultUtil from './get-with-default';
import parseChangesetWebformField from './parse-changeset-webform-field';
import FormSettings from './form-settings';

export default function createChangesetWebform(
  appDefaults,
  formSchema,
  data,
  customValidators,
  opts,
) {
  const formSchemaWithDefaults = getWithDefaultUtil(appDefaults, formSchema);
  const parsedFields = formSchemaWithDefaults.fields.map((item) =>
    parseChangesetWebformField(
      item,
      customValidators,
      formSchemaWithDefaults.formSettings,
    ),
  );
  const changeset = createChangeset(parsedFields, data, customValidators, opts);
  parsedFields.forEach((field) => {
    field.changeset = changeset;
  });
  return {
    changeset: changeset,
    fields: parsedFields,
    formSettings: new FormSettings(formSchemaWithDefaults.formSettings),
    formSchema: { ...formSchema },
    formSchemaWithDefaults: { ...formSchemaWithDefaults },
  };
}
