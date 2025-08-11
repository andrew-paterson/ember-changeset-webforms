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

  get isValid() {
    if (
      !this.changeset.isValid ||
      this.fields.filter(
        (field) => field.validates && !field.wasValidated && !field.isOmitted,
      ).length > 0
    ) {
      return false;
    }
    return true;
  }

  _checkOmitted() {
    this.fields.forEach((field) => {
      field._checkOmitted();
    });
  }

  getField(fieldId) {
    const field = this.fields.find((field) => field.fieldId === fieldId);
    if (!field) {
      return null;
    }
    return field;
  }

  async getData() {
    const savedChangeset = await this.changeset.save();
    return savedChangeset.data;
  }

  setFieldOmission(fieldId, omitted) {
    const field = this.getField(fieldId);
    if (!field) {
      return;
    }
    field.setOmission(omitted);
  }

  pushErrors(opts) {
    const formField = this.getField(opts.fieldId);
    formField.pushErrors(opts.errors);
  }

  async validate(opts) {
    var validatePromises = this.fields
      .map((field) => {
        return field.validate(opts);
      })
      .filter((item) => item);
    return await Promise.all(validatePromises);
  }

  _validateFields() {
    var validatePromises = this.fields
      .map((field) => {
        return field._validateField();
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
