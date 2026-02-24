import parseChangesetWebformField from './parse-changeset-webform-field.js';
import FormField from './form-field.js';

export default function generateFormFieldInstance(
  fieldSchema,
  formName,
  modules = {},
) {
  if (!fieldSchema) {
    return;
  }
  if (!fieldSchema.fieldId) {
    throw Error(
      `[Ember validating field] fieldId is a required field for each field in a validating form.`,
    );
  }
  if (
    !fieldSchema.fieldLabel &&
    !fieldSchema.labelComponent &&
    !fieldSchema.labelMarkdown &&
    !['noDisplay', 'singleCheckbox', 'staticContent'].includes(
      fieldSchema.fieldType,
    )
  ) {
    console.warn(
      `[Ember validating field - ${fieldSchema.fieldId}] fieldLabel should be included for this field, to ensure sematic markup and accessibility. You can set hideLabel to true if you want to hide the label.`,
    );
  }
  const parsedField = parseChangesetWebformField(
    fieldSchema,
    formName,
    modules.Option,
  );
  const FormFieldModule = modules.FormField || FormField;
  return new FormFieldModule(parsedField, modules.FormFieldClone);
}
