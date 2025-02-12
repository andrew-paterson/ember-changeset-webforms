import { action } from '@ember/object';
import Component from '@glimmer/component';
import validateAllowedFields from '../utils/validate-fields.js';
import nullifyExcludedFields from '../utils/nullify-excluded-fields.js';
import createChangesetWebform from '../utils/create-changeset-webform.js';
import isPromise from '../utils/is-promise.js';
import { tracked } from '@glimmer/tracking';
import { inject } from '@ember/service';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  class=\"changeset-webform\n    {{ember-changeset-webforms/dynamic-class-names\n      \'formWrapper\'\n      this.changesetWebform\n      null\n      @requestInFlight\n    }}\"\n  {{did-insert this.didInsert}}\n  ...attributes\n>\n  <form\n    {{on \"submit\" this.submitForm}}\n    class={{concat\n      this.formValidationClass\n      \" \"\n      (ember-changeset-webforms/dynamic-class-names\n        \"formElement\" this.changesetWebform\n      )\n    }}\n    novalidate={{this.formSettings.novalidate}}\n    data-test-id={{ember-changeset-webforms/safe-name\n      this.formSettings.formName\n    }}\n  >\n    <div\n      class=\"{{ember-changeset-webforms/dynamic-class-names\n          \'formFields\'\n          this.changesetWebform\n          null\n          @requestInFlight\n        }}\"\n    >\n      {{#each this.changesetWebform.fields as |formField|}}\n        <EmberChangesetWebforms::FieldElements::ValidatingField\n          @formField={{formField}}\n          @changesetWebform={{this.changesetWebform}}\n          @dataTestFormName={{this.formSettings.dataTestFormName}}\n          @afterClickAddCloneButton={{@afterClickAddCloneButton}}\n          @formSettings={{this.formSettings}}\n          @formFields={{this.changesetWebform.fields}}\n          @submitForm={{fn\n            this.submitForm\n            this.changesetWebform\n            this.formSettings.modelName\n          }}\n          @afterFieldValidation={{this.afterFieldValidationAction}}\n          @onFieldValueChange={{this.onFieldValueChangeAction}}\n          @onUserInteraction={{this.onUserInteraction}}\n          @onFieldInserted={{this.onFieldInsertedAction}}\n        />\n      {{/each}}\n    </div>\n    {{yield}}\n    <div\n      class=\"{{ember-changeset-webforms/dynamic-class-names\n          \'formActions\'\n          this.changesetWebform\n          null\n          @requestInFlight\n        }}\"\n    >\n      {{#unless this.formSettings.hideSubmitButton}}\n        <EmberChangesetWebforms::FormElements::FormSubmitButton\n          {{on\n            \"click\"\n            (fn\n              this.submitForm this.changesetWebform this.formSettings.modelName\n            )\n          }}\n          @value={{this.formSettings.submitButtonText}}\n          @requestInFlight={{@requestInFlight}}\n          data-test-id=\"cwf-submit-form-button\"\n          @disabled={{this.formSettings.submitDisabled}}\n          @formSettings={{this.formSettings}}\n          @changesetWebform={{this.changesetWebform}}\n          class=\"{{ember-changeset-webforms/dynamic-class-names\n              \'buttonElement,submitButton\'\n              this.changesetWebform\n            }}\"\n        />\n      {{/unless}}\n      {{#if this.formSettings.showRollbackChangesetButton}}\n        <button\n          class={{this.formSettings.showRollbackChangesetButtonClasses}}\n          type=\"button\"\n          data-test-id=\"cwf-reset-form-button\"\n          {{on \"click\" (fn this.discardChanges this.changesetWebform)}}\n        >{{this.formSettings.showRollbackChangesetButtonText}}</button>\n      {{/if}}\n      {{#if this.formSettings.showClearFormButton}}\n        <button\n          type=\"button\"\n          data-test-id=\"cwf-reset-form-button\"\n          {{on \"click\" (fn this.clearForm this.changesetWebform)}}\n          class=\"{{ember-changeset-webforms/dynamic-class-names\n              \'buttonElement,clearFormButton\'\n              this.changesetWebform\n            }}\"\n        >{{this.formSettings.clearFormButtonText}}</button>\n      {{/if}}\n    </div>\n  </form>\n</div>");

class ChangesetWebform extends Component {
  static {
    g(this.prototype, "emberChangesetWebforms", [inject]);
  }
  #emberChangesetWebforms = (i(this, "emberChangesetWebforms"), undefined);
  static {
    g(this.prototype, "changesetWebform", [tracked]);
  }
  #changesetWebform = (i(this, "changesetWebform"), undefined);
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
    return formFields.find(field => {
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
  didInsert() {
    this.generateChangesetWebform(this.args.formSchema, this.args.data, this.args.customValidators);
  }
  static {
    n(this.prototype, "didInsert", [action]);
  }
  generateChangesetWebform(formSchema, data, customValidators, opts) {
    this.changesetWebform = createChangesetWebform(this.emberChangesetWebforms.changesetWebformsDefaults, formSchema, data, customValidators, opts);
    if (this.args.afterGenerateChangesetWebform) {
      this.args.afterGenerateChangesetWebform(this.changesetWebform);
    }
  }
  static {
    n(this.prototype, "generateChangesetWebform", [action]);
  }
  onFieldValueChangeAction(formField, changeset, snapshot) {
    if (this.args.onFieldValueChange) {
      this.args.onFieldValueChange(formField, this.changesetWebform, snapshot);
    }
  }
  static {
    n(this.prototype, "onFieldValueChangeAction", [action]);
  }
  onFieldInsertedAction(formField) {
    if (this.args.onFieldInserted) {
      this.args.onFieldInserted(formField, this.changesetWebform);
    }
  }
  static {
    n(this.prototype, "onFieldInsertedAction", [action]);
  }
  afterFieldValidationAction(formField, _changeset, fieldValidationErrors) {
    if (this.args.afterFieldValidation) {
      this.args.afterFieldValidation(formField, this.changesetWebform, fieldValidationErrors);
    }
  }
  static {
    n(this.prototype, "afterFieldValidationAction", [action]);
  }
  onUserInteraction(formField, eventName, value, event) {
    if (this.args.onUserInteraction) {
      this.args.onUserInteraction(formField, this.changesetWebform, eventName, value, event);
    }
  }
  //  TODO allow action to completely replace this action
  static {
    n(this.prototype, "onUserInteraction", [action]);
  }
  submitForm(changesetWebform) {
    const changeset = changesetWebform.changeset;
    validateAllowedFields(changesetWebform).then(validationResult => {
      if (this.args.afterValidateFields) {
        this.args.afterValidateFields(changesetWebform, validationResult);
      }
      if (changeset.isValid) {
        if (this.args.formValidationPassed) {
          this.args.formValidationPassed(changesetWebform);
        }
        try {
          if (this.args.beforeSubmitAction) {
            this.args.beforeSubmitAction(changesetWebform); // TODO how to make this await or not.
          }
        } catch (err) {
          console.log(err);
        }
        try {
          nullifyExcludedFields(changesetWebform); // TODO test this
        } catch (err) {
          console.log(err);
        }
        changesetWebform.formSettings.requestInFlight = true;
        if (this.args.submitAction) {
          changeset.save().then(savedChangeset => {
            try {
              var submitAction = this.args.submitAction(savedChangeset.data, changesetWebform);
              if (isPromise(submitAction)) {
                submitAction.then(submitActionResponse => {
                  changesetWebform.formSettings.requestInFlight = false;
                  if (this.args.submitSuccess) {
                    this.args.submitSuccess(submitActionResponse, changesetWebform);
                  }
                  if (changesetWebform.formSettings.clearFormAfterSubmit) {
                    this.clearForm(changesetWebform);
                  }
                }).catch(error => {
                  changesetWebform.formSettings.requestInFlight = false;
                  if (this.args.submitError) {
                    this.args.submitError(error, changesetWebform);
                  }
                });
              } else {
                changesetWebform.formSettings.requestInFlight = false;
                var submitActionResponse = submitAction;
                if (this.args.submitSuccess) {
                  this.args.submitSuccess(submitActionResponse, changesetWebform);
                }
                if (changesetWebform.formSettings.clearFormAfterSubmit) {
                  this.clearForm(changesetWebform);
                }
              }
            } catch (error) {
              changesetWebform.formSettings.requestInFlight = false;
              if (this.args.submitError) {
                this.args.submitError(error, changesetWebform);
              }
            }
          }).catch(err => {
            changesetWebform.formSettings.requestInFlight = false;
            if (this.args.submitError) {
              this.args.submitError(err, changesetWebform);
            }
          });
        } else {
          changeset.save().then(saveChangesetResponse => {
            changesetWebform.formSettings.requestInFlight = false;
            if (this.args.submitSuccess) {
              this.args.submitSuccess(saveChangesetResponse, changesetWebform);
            }
            if (changesetWebform.formSettings.clearFormAfterSubmit) {
              this.clearForm(changesetWebform);
            }
          }).catch(error => {
            if (this.args.submitError) {
              this.args.submitError(error, changesetWebform);
            }
            changesetWebform.formSettings.requestInFlight = false;
          });
        }
      } else {
        if (this.args.formValidationFailed) {
          this.args.formValidationFailed(changesetWebform);
        }
      }
    }).catch(err => {
      changesetWebform.formSettings.requestInFlight = false;
      if (this.args.formValidationFailed) {
        this.args.formValidationFailed(changesetWebform, err);
      }
    });
  }
  static {
    n(this.prototype, "submitForm", [action]);
  }
  discardChanges(changesetWebform) {
    changesetWebform.changeset.rollback();
  }
  static {
    n(this.prototype, "discardChanges", [action]);
  }
  clearForm(changesetWebform) {
    // TODO test for this
    const opts = {
      suppressDefaults: changesetWebform.formSettings.clearFormAfterSubmit === 'suppressDefaultValues'
    };
    if (this.args.beforeReset) {
      this.args.beforeReset(changesetWebform);
    }
    this.generateChangesetWebform(this.args.formSchema, null, this.args.customValidators, opts);
    if (changesetWebform.formSettings.submitAfterClear) {
      this.submitForm(this.changesetWebform);
    }
  }
  static {
    n(this.prototype, "clearForm", [action]);
  }
}
setComponentTemplate(TEMPLATE, ChangesetWebform);

export { ChangesetWebform as default };
//# sourceMappingURL=changeset-webform.js.map
