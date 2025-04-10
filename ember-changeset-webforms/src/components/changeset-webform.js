import { action } from '@ember/object';
import Component from '@glimmer/component';
import createChangesetWebform from '../utils/create-changeset-webform.js';
import onSubmit from '../utils/on-submit.js';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';

export default class ChangesetWebform extends Component {
  @service emberChangesetWebforms;
  @tracked changesetWebform;

  get debugMode() {
    const config = getOwner(this).resolveRegistration('config:environment');
    if (config && config.environment === 'production') {
      return false;
    }
    return this.emberChangesetWebforms.debug || this.args.debug;
  }

  get formSettings() {
    if (!this.changesetWebform) {
      return null;
    }
    return this.changesetWebform.formSettings;
  }

  get formFields() {
    if (!this.formObject) {
      return null;
    }
    return this.formObject.formFields;
  }

  get needsValidation() {
    var formFields = this.formFields || [];
    return formFields.find((field) => {
      field.validationRules = field.validationRules || [];
      return field.validationRules.length > 0;
    });
  }

  get changeset() {
    return (this.changesetWebform || {}).changeset;
  }

  get formValidationClass() {
    // TODO this should be configurable
    if (!this.changeset) {
      return null;
    }
    if (this.changeset.get('isInvalid')) {
      return 'validation-failed';
    }
    if (this.changeset.get('isValid')) {
      return 'validation-passed';
    }
    return null;
  }

  @action
  didInsert() {
    this.generateChangesetWebform(this.args.formSchema, this.args.data);
  }

  @action
  generateChangesetWebform(formSchema, data) {
    const customValidators = this.args.customValidators;
    const dynamicIncludeExcludeConditions =
      this.args.dynamicIncludeExcludeConditions;
    const debug = this.debugMode;
    const onFormSubmit = this.args.onFormSubmit || onSubmit;

    this.changesetWebform = createChangesetWebform(
      this.emberChangesetWebforms.changesetWebformsDefaults,
      formSchema,
      data,
      customValidators,
      dynamicIncludeExcludeConditions,
      onFormSubmit,
      debug,
    );
    if (this.args.afterGenerateChangesetWebform) {
      this.args.afterGenerateChangesetWebform(this.changesetWebform);
    }
  }

  @action
  onFieldValueChange(formField) {
    if (this.args.onFieldValueChange) {
      this.args.onFieldValueChange(formField, this.changesetWebform);
    }
  }

  @action
  afterFieldInserted(formField) {
    if (this.args.afterFieldInserted) {
      this.args.afterFieldInserted(formField, this.changesetWebform);
    }
  }

  @action
  afterFieldRemoved(formField) {
    if (this.args.afterFieldRemoved) {
      this.args.afterFieldRemoved(formField, this.changesetWebform);
    }
  }

  @action
  afterFieldValidation(formField, _changeset, fieldValidationErrors) {
    if (this.args.afterFieldValidation) {
      this.args.afterFieldValidation(
        formField,
        this.changesetWebform,
        fieldValidationErrors,
      );
    }
  }

  @action
  onUserInteraction(formField, eventName, value, event) {
    if (this.args.onUserInteraction) {
      this.args.onUserInteraction(
        formField,
        this.changesetWebform,
        eventName,
        value,
        event,
      );
    }
  }

  @action
  onFormSubmit(changesetWebform) {
    changesetWebform.submit(this.args);
  }

  @action
  resetForm(changesetWebform) {
    if (this.args.beforeResetForm) {
      this.args.beforeResetForm(changesetWebform);
    }
    this.generateChangesetWebform(this.args.formSchema, this.args.data);
    if (this.args.afterResetForm) {
      this.args.afterResetForm(changesetWebform);
    }
  }

  @action
  clearForm(changesetWebform) {
    if (this.args.beforeClearForm) {
      this.args.beforeClearForm(changesetWebform);
    }
    const formSchema = { ...this.args.formSchema };
    formSchema.fields = this.args.formSchema.fields.map((field) => {
      const newField = { ...field };
      delete newField.defaultValue;
      return newField;
    });
    this.generateChangesetWebform(formSchema, null);
    if (this.args.afterClearForm) {
      this.args.afterClearForm(changesetWebform);
    }
    if (changesetWebform.formSettings.submitAfterClear) {
      this.onFormSubmit(this.changesetWebform);
    }
  }
}
