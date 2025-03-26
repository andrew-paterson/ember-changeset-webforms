import { action } from '@ember/object';
import Component from '@glimmer/component';
import createChangesetWebform from '../utils/create-changeset-webform.js';
import onSubmit from '../utils/on-submit.js';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ChangesetWebform extends Component {
  @service emberChangesetWebforms;
  @tracked changesetWebform;

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
    this.generateChangesetWebform(
      this.args.formSchema,
      this.args.data,
      this.args.customValidators,
      this.args.dynamicIncludeExcludeConditions,
    );
  }

  @action
  generateChangesetWebform(
    formSchema,
    data,
    customValidators,
    dynamicIncludeExcludeConditions,
  ) {
    this.changesetWebform = createChangesetWebform(
      this.emberChangesetWebforms.changesetWebformsDefaults,
      formSchema,
      data,
      customValidators,
      dynamicIncludeExcludeConditions,
    );
    if (this.args.afterGenerateChangesetWebform) {
      this.args.afterGenerateChangesetWebform(this.changesetWebform);
    }
  }

  @action
  onFieldValueChangeAction(formField, changeset, snapshot) {
    if (this.args.onFieldValueChange) {
      this.args.onFieldValueChange(formField, this.changesetWebform, snapshot);
    }
  }

  @action
  afterFieldInsertedAction(formField) {
    if (this.args.afterFieldInserted) {
      this.args.afterFieldInserted(formField, this.changesetWebform);
    }
  }

  @action
  afterFieldRemovedAction(formField) {
    if (this.args.afterFieldRemoved) {
      this.args.afterFieldRemoved(formField, this.changesetWebform);
    }
  }

  @action
  afterFieldValidationAction(formField, _changeset, fieldValidationErrors) {
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
  //  TODO allow action to completely replace this action
  @action
  submitForm(changesetWebform) {
    onSubmit(changesetWebform, this.args);
  }

  @action
  discardChanges(changesetWebform) {
    changesetWebform.changeset.rollback();
    changesetWebform.fields.forEach((field) => {
      field.eventLog = ['insert'];
      field.validate();
    });
  }

  @action
  clearForm(changesetWebform) {
    if (this.args.beforeReset) {
      this.args.beforeReset(changesetWebform);
    }
    this.generateChangesetWebform(
      this.args.formSchema,
      null,
      this.args.customValidators,
      this.args.dynamicIncludeExcludeConditions,
    );
    if (changesetWebform.formSettings.submitAfterClear) {
      this.submitForm(this.changesetWebform);
    }
  }
}
