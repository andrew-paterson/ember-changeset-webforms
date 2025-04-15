import { tracked } from '@glimmer/tracking';
import createChangeset from './create-changeset.js';
import getWithDefaultUtil from './get-with-default.js';
import parseChangesetWebformField from './parse-changeset-webform-field.js';
import FormSettings from './form-settings.js';

export default class ChangesetWebform {
  @tracked changeset;
  @tracked fields;

  constructor(
    appDefaults,
    formSchema,
    data,
    customValidators,
    dynamicIncludeExcludeConditions,
    onFormSubmit,
    debug,
  ) {
    const formSchemaWithDefaults = getWithDefaultUtil(appDefaults, formSchema);
    const changeset = createChangeset(
      formSchemaWithDefaults.fields,
      data,
      customValidators,
    );
    const parsedFields = formSchemaWithDefaults.fields.map((field) =>
      parseChangesetWebformField(
        field,
        customValidators,
        formSchemaWithDefaults.formSettings,
        changeset,
      ),
    );
    const snapshots = [];
    parsedFields.forEach((formField, index) => {
      formField.index = index;
      formField.siblings = parsedFields.filter(
        (field) => field.fieldId !== formField.fieldId,
      );
      formField.dynamicIncludeExcludeConditions =
        dynamicIncludeExcludeConditions;
      formField.snapshots = snapshots;
      // formField.applyDefaultValue();
    });
    this.debug = debug;
    this.changeset = changeset;
    this.fields = parsedFields;
    this.snapshots = snapshots;
    this.formSettings = new FormSettings(formSchemaWithDefaults.formSettings);
    this.formSchema = { ...formSchema };
    this.formSchemaWithDefaults = { ...formSchemaWithDefaults };
    this.submit = (componentArgs) => {
      return onFormSubmit(this, componentArgs);
    };
  }

  setFieldOmission(fieldId, omitted) {
    const field = this.fields.find((field) => field.fieldId === fieldId);
    if (!field) {
      return;
    }
    field.setOmission(omitted);
  }

  async isValid() {
    const fields = this.fields.filter((field) => {
      return field.validates && !field.isOmitted;
    });
    for (var field of fields) {
      await this.changeset.validate(field.propertyName);
    }
    return this.changeset.isValid;
  }

  async validate(opts) {
    var validatePromises = this.fields
      .map((field) => {
        return field.validate(opts);
      })
      .filter((item) => item);
    return await Promise.all(validatePromises);
  }

  validateFields() {
    var validatePromises = this.fields
      .map((field) => {
        return field.validateField();
      })
      .filter((item) => item);
    return Promise.all(validatePromises);
  }
}
