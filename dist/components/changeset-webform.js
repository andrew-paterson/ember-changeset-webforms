import { action } from '@ember/object';
import Component from '@glimmer/component';
import ChangesetWebform from '../utils/changeset-webform-class.js';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { getOwner } from '@ember/application';
import addonDefaults from '../utils/addon-defaults.js';
import FormField from '../utils/form-field.js';
import FormFieldClone from '../utils/form-field-clone.js';
import FormSettings from '../utils/form-settings.js';
import Option from '../utils/option-class.js';
import { Changeset } from 'ember-changeset';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if this.changesetWebform}}\n  <div\n    class=\"changeset-webform\"\n    {{attrs-from-config \"formWrapper\" this.changesetWebform}}\n    ...attributes\n  >\n    <form\n      {{on \"submit\" this.onFormSubmit}}\n      {{attrs-from-config \"formElement\" this.changesetWebform}}\n      novalidate={{this.changesetWebform.formSettings.novalidate}}\n      data-test-id={{ember-changeset-webforms/safe-name\n        this.changesetWebform.formSettings.formName\n      }}\n    >\n      <div\n        {{attrs-from-config\n          \"formFields\"\n          this.changesetWebform\n          null\n          @requestInFlight\n        }}\n      >\n        {{#each this.changesetWebform.fields as |formField|}}\n          <EmberChangesetWebforms::FieldElements::ValidatingField\n            @formField={{formField}}\n            @changesetWebform={{this.changesetWebform}}\n            @dataTestFormName={{this.changesetWebform.formSettings.dataTestFormName}}\n            @afterClickAddCloneButton={{@afterClickAddCloneButton}}\n            @formSettings={{this.changesetWebform.formSettings}}\n            @formFields={{this.changesetWebform.fields}}\n            @onFormSubmit={{fn this.onFormSubmit this.changesetWebform}}\n            @onUserInteraction={{this.onUserInteraction}}\n            @afterFieldInserted={{this.afterFieldInserted}}\n            @afterFieldRemoved={{this.afterFieldRemoved}}\n          />\n        {{/each}}\n      </div>\n      {{yield}}\n      <EmberChangesetWebforms::FormElements::FormActions\n        @changesetWebform={{this.changesetWebform}}\n        @formSettings={{this.changesetWebform.formSettings}}\n        @onFormSubmit={{this.onFormSubmit}}\n        @resetForm={{this.resetForm}}\n        @clearForm={{this.clearForm}}\n      />\n    </form>\n  </div>\n{{else}}\n  <div {{did-insert this.didInsert}}></div>\n{{/if}}");

const modules = {
  FormField: FormField,
  FormFieldClone: FormFieldClone,
  FormSettings: FormSettings,
  Option: Option,
  Changeset: Changeset
};
class ChangesetWebformComponent extends Component {
  static {
    g(this.prototype, "emberChangesetWebforms", [service]);
  }
  #emberChangesetWebforms = (i(this, "emberChangesetWebforms"), void 0);
  static {
    g(this.prototype, "changesetWebform", [tracked]);
  }
  #changesetWebform = (i(this, "changesetWebform"), void 0);
  get debugMode() {
    const config = getOwner(this).resolveRegistration('config:environment');
    if (config && config.environment === 'production') {
      return false;
    }
    return this.emberChangesetWebforms?.debug || this.args.debug;
  }
  didInsert() {
    const debug = this.debugMode;
    const callbacks = {
      onFieldValueChange: this.args.onFieldValueChange,
      beforeResetForm: this.args.beforeResetForm,
      afterResetForm: this.args.afterResetForm,
      beforeClearForm: this.args.beforeClearForm,
      afterClearForm: this.args.afterClearForm,
      submitData: this.args.submitData,
      submitSuccess: this.args.submitSuccess,
      submitError: this.args.submitError,
      submitComplete: this.args.submitComplete,
      afterFieldValidation: this.args.afterFieldValidation,
      afterValidateFields: this.args.afterValidateFields,
      formValidationPassed: this.args.formValidationPassed,
      beforeSubmitForm: this.args.beforeSubmitForm,
      formValidationFailed: this.args.formValidationFailed
    };
    this.changesetWebform = new ChangesetWebform(this.args.formSchema, this.args.data, {
      appDefaults: [addonDefaults, this.emberChangesetWebforms.changesetWebformsDefaults],
      dynamicIncludeExcludeConditions: this.args.dynamicIncludeExcludeConditions,
      onFormSubmit: this.args.onFormSubmit,
      debug: debug,
      callbacks: callbacks,
      modules: modules
    });
    if (this.changesetWebform.debug) {
      console.log('[Ember Changeset Webforms] DEBUG changesetWebform object', this.changesetWebform);
    }
    if (this.args.afterGenerateChangesetWebform) {
      this.args.afterGenerateChangesetWebform(this.changesetWebform);
    }
  }
  static {
    n(this.prototype, "didInsert", [action]);
  }
  afterFieldInserted(formField) {
    if (this.args.afterFieldInserted) {
      this.args.afterFieldInserted(formField, this.changesetWebform);
    }
  }
  static {
    n(this.prototype, "afterFieldInserted", [action]);
  }
  afterFieldRemoved(formField) {
    if (this.args.afterFieldRemoved) {
      this.args.afterFieldRemoved(formField, this.changesetWebform);
    }
  }
  static {
    n(this.prototype, "afterFieldRemoved", [action]);
  }
  onUserInteraction(formField, eventName, value, event) {
    if (this.args.onUserInteraction) {
      this.args.onUserInteraction(formField, this.changesetWebform, eventName, value, event);
    }
  }
  static {
    n(this.prototype, "onUserInteraction", [action]);
  }
  onFormSubmit(changesetWebform) {
    // Get keys in this.args whoch is a proxy object and convert to array to log, as logging the proxy directly causes it to resolve and log all keys and values which is not desirable
    return changesetWebform.submit(this.args);
  }
  static {
    n(this.prototype, "onFormSubmit", [action]);
  }
  resetForm() {
    this.changesetWebform.reset();
  }
  static {
    n(this.prototype, "resetForm", [action]);
  }
  clearForm() {
    this.changesetWebform.clear();
    if (this.changesetWebform.formSettings.submitAfterClear) {
      this.onFormSubmit(this.changesetWebform);
    }
  }
  static {
    n(this.prototype, "clearForm", [action]);
  }
}
setComponentTemplate(TEMPLATE, ChangesetWebformComponent);

export { ChangesetWebformComponent as default };
//# sourceMappingURL=changeset-webform.js.map
