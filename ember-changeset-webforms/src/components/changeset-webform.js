import { action } from '@ember/object';
import Component from '@glimmer/component';
import ChangesetWebform from '../utils/changeset-webform-class.js';
import onSubmit from 'validated-changeset-webforms/dist/utils/on-submit.js';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { getOwner } from '@ember/application';
import addonDefaults from '../utils/addon-defaults.js';
import _FormField from '../utils/form-field.js';
import _FormFieldClone from '../utils/form-field-clone.js';
import _FormSettings from '../utils/form-settings.js';
import _OptionClass from '../utils/option-class.js';
import { Changeset } from 'ember-changeset';

const modules = {
  FormField: _FormField,
  FormFieldClone: _FormFieldClone,
  FormSettings: _FormSettings,
  Option: _OptionClass,
  Changeset: Changeset,
};
export default class ChangesetWebformComponent extends Component {
  @service emberChangesetWebforms;
  @tracked changesetWebform;

  get debugMode() {
    const config = getOwner(this).resolveRegistration('config:environment');
    if (config && config.environment === 'production') {
      return false;
    }
    return this.emberChangesetWebforms?.debug || this.args.debug;
  }

  @action
  didInsert() {
    const debug = this.debugMode;
    const onFormSubmit = this.args.onFormSubmit || onSubmit;
    const callbacks = {
      onFieldValueChange: this.args.onFieldValueChange,
      afterFieldValidation: this.args.afterFieldValidation,
      beforeResetForm: this.args.beforeResetForm,
      afterResetForm: this.args.afterResetForm,
      beforeClearForm: this.args.beforeClearForm,
      afterClearForm: this.args.afterClearForm,
      // TODO after validateallFields
    };
    this.changesetWebform = new ChangesetWebform(
      this.args.formSchema,
      this.args.data,
      {
        appDefaults: [
          addonDefaults,
          this.emberChangesetWebforms.changesetWebformsDefaults,
        ],
        dynamicIncludeExcludeConditions:
          this.args.dynamicIncludeExcludeConditions,
        onFormSubmit: onFormSubmit,
        debug: debug,
        callbacks: callbacks,
        modules: modules,
      },
    );
    if (this.changesetWebform.debug) {
      console.log(
        '[Ember Changeset Webforms] DEBUG changesetWebform object',
        this.changesetWebform,
      );
    }
    if (this.args.afterGenerateChangesetWebform) {
      this.args.afterGenerateChangesetWebform(this.changesetWebform);
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
    return changesetWebform.submit(this.args);
  }

  @action
  resetForm() {
    this.changesetWebform.reset();
  }

  @action
  clearForm() {
    this.changesetWebform.clear();
    if (this.changesetWebform.formSettings.submitAfterClear) {
      this.onFormSubmit(this.changesetWebform);
    }
  }
}
