import { tracked } from '@glimmer/tracking';
import createChangeset from './create-changeset.js';
import getWithDefaultUtil from './get-with-default.js';
import parseChangesetWebformField from './parse-changeset-webform-field.js';
import FormSettings from './form-settings.js';

function createThings(data, env) {
  const parsedFields = env.formSchemaWithDefaults.fields.map((field) =>
    parseChangesetWebformField(
      field,
      env.customValidators,
      env.formSchemaWithDefaults.formSettings,
    ),
  );

  const changeset = createChangeset(parsedFields, data, env.customValidators);

  const snapshots = [];
  parsedFields.forEach((formField, index) => {
    formField.index = index;
    formField.siblings = parsedFields.filter(
      (field) => field.fieldId !== formField.fieldId,
    );
    formField.dynamicIncludeExcludeConditions =
      env.dynamicIncludeExcludeConditions;
    formField.snapshots = snapshots;
    formField.changeset = changeset;
    formField.changesetWebform = env;
    formField.callbacks = {
      onFieldValueChange: env.callbacks.onFieldValueChange,
      afterFieldValidation: env.callbacks.afterFieldValidation,
    };
    formField._checkOmitted();
    // We set changeset props to null if they have no initial values. This ensurs that validators such as uniqueness work, and that all keys are sent in the payload.
  });
  return {
    changeset: changeset,
    parsedFields: parsedFields,
    snapshots: snapshots,
    formSettings: new FormSettings(env.formSchemaWithDefaults.formSettings),
  };
}

function updateTheThings(data, env) {
  const things = createThings(data, env);
  env.changeset = things.changeset;
  env.fields = things.parsedFields;
  env.snapshots = things.snapshots;
  env.formSettings = things.formSettings;
}

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
    callbacks,
  ) {
    const formSchemaWithDefaults = getWithDefaultUtil(appDefaults, formSchema);
    this.formSchema = { ...formSchema };
    this.formSchemaWithDefaults = { ...formSchemaWithDefaults };
    this.debug = debug;
    this.customValidators = customValidators;
    this.dynamicIncludeExcludeConditions = dynamicIncludeExcludeConditions;
    this.callbacks = callbacks;
    updateTheThings(data, this);
    this.submit = (componentArgs, callbacks) => {
      return onFormSubmit(this, componentArgs, callbacks);
    };
  }

  _checkOmitted() {
    this.fields.forEach((field) => {
      field._checkOmitted();
    });
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

  clear() {
    updateTheThings(null, this);
  }
}
