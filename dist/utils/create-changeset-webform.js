import createChangeset from './create-changeset.js';
import getWithDefault from './get-with-default.js';
import parseChangesetWebformField from './parse-changeset-webform-field.js';
import FormSettings from './form-settings.js';

function createChangesetWebform(appDefaults, formSchema, data, customValidators, opts) {
  const formSchemaWithDefaults = getWithDefault(appDefaults, formSchema);
  const parsedFields = formSchemaWithDefaults.fields.map(item => parseChangesetWebformField(item, customValidators, formSchemaWithDefaults.formSettings));
  const changeset = createChangeset(parsedFields, data, customValidators, opts);
  parsedFields.forEach(field => {
    field.changeset = changeset;
  });
  return {
    changeset: changeset,
    fields: parsedFields,
    formSettings: new FormSettings(formSchemaWithDefaults.formSettings),
    formSchema: {
      ...formSchema
    },
    formSchemaWithDefaults: {
      ...formSchemaWithDefaults
    }
  };
}

export { createChangesetWebform as default };
//# sourceMappingURL=create-changeset-webform.js.map
