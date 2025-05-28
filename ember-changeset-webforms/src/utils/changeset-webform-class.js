import { tracked } from '@glimmer/tracking';
import getWithDefaultUtil from './get-with-default.js';
import createCwfProps from './create-changeset-webform-props.js';

function setCwfProps(instance, data, opts = {}) {
  const props = createCwfProps(instance, data, opts);
  if (!instance.changeset) {
    instance.changeset = props.changeset;
  }
  instance.fields = props.parsedFields;
  instance.formSettings = props.formSettings;
}

export default class ChangesetWebform {
  @tracked changeset;
  @tracked fields;

  constructor(
    appDefaults,
    formSchema,
    data,
    dynamicIncludeExcludeConditions,
    onFormSubmit,
    debug,
    callbacks,
  ) {
    const formSchemaWithDefaults = getWithDefaultUtil(appDefaults, formSchema);
    this.formSchema = { ...formSchema };
    this.formSchemaWithDefaults = { ...formSchemaWithDefaults };
    this.debug = debug;
    this.dynamicIncludeExcludeConditions = dynamicIncludeExcludeConditions;
    this.callbacks = callbacks;
    setCwfProps(this, data);
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

  pushErrors(opts) {
    this.changeset.pushErrors(opts.fieldId, ...opts.errors);
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
    if (this.callbacks.beforeClearForm) {
      this.callbacks.beforeClearForm(this);
    }
    this.changeset.rollback();
    setCwfProps(this);
    this.fields.forEach((field) => {
      this.changeset.set(field.propertyName, null);
    });
    if (this.callbacks.afterClearForm) {
      this.callbacks.afterClearForm(this);
    }
  }

  reset() {
    if (this.callbacks.beforeResetForm) {
      this.callbacks.beforeResetForm(this);
    }
    this.changeset.rollback();
    setCwfProps(this);
    if (this.callbacks.afterResetForm) {
      this.callbacks.afterResetForm(this);
    }
  }
}
