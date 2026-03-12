import { action } from '@ember/object';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if\n  (and\n    @changesetWebform.changeset\n    (not @formField.isOmitted)\n    (not-eq @formField.fieldType \"noDisplay\")\n  )\n}}\n  {{#if @formField.cloneGroupName}}\n    <EmberChangesetWebforms::ClonedFieldElements::ValidatingCloneGroup\n      @masterFormField={{@formField}}\n      @updateFieldValue={{this.updateFieldValue}}\n      @validateField={{this.validateField}}\n      @afterClickAddCloneButton={{@afterClickAddCloneButton}}\n      @onUserInteraction={{this.onUserInteraction}}\n      @dataTestFieldId={{or @dataTestId @formField.id}}\n      @changesetWebform={{@changesetWebform}}\n      {{did-insert this.didInsert}}\n      {{will-destroy this.willDestroyAction}}\n    />\n  {{else}}\n    <EmberChangesetWebforms::FieldElements::ValidatingFieldWrapper\n      @formField={{@formField}}\n      @dataTestFormName={{@dataTestFormName}}\n      @dataTestFieldId={{or @dataTestId @formField.id}}\n      @changesetWebform={{@changesetWebform}}\n      @labelId={{@formField.labelId}}\n      @ariaLabelledBy={{@formField.ariaLabelledBy}}\n      @ariaLabel={{@formField.ariaLabel}}\n      @validationErrorsArray={{@formField.validationErrors}}\n      data-test-cwf-field\n      {{did-insert this.didInsert}}\n      {{will-destroy this.willDestroyAction}}\n    >\n      <@formField.componentClass\n        @formField={{@formField}}\n        @formFields={{@formFields}}\n        @formSettings={{@formSettings}}\n        @updateFieldValue={{this.updateFieldValue}}\n        @onUserInteraction={{this.onUserInteraction}}\n        @changesetWebform={{@changesetWebform}}\n        @dataTestFieldId={{or @dataTestId @formField.id}}\n        @labelId={{@formField.labelId}}\n        @ariaLabelledBy={{@formField.ariaLabelledBy}}\n        @ariaErrorMessage={{@formField.ariaErrorMessage}}\n        @ariaDescribedBy={{@formField.ariaDescribedBy}}\n        @onFormSubmit={{@onFormSubmit}}\n      />\n      {{#if @formField.description}}\n        <EmberChangesetWebforms::FieldElements::FieldDescription\n          @description={{@formField.description}}\n          @descriptionMarkdown={{@formField.descriptionMarkdown}}\n        />\n      {{/if}}\n    </EmberChangesetWebforms::FieldElements::ValidatingFieldWrapper>\n  {{/if}}\n{{/if}}");

class ValidatingField extends Component {
  didInsert(element) {
    var formField = this.args.formField;
    formField.eventLog.push('insert');
    if (formField.fieldValue) {
      formField.eventLog.push('insertWithValue');
    }
    setTimeout(() => {
      formField.customValidityEls = element.querySelectorAll('[data-set-custom-validity]');
    });
    this.validateField(formField, element);
    this.args.afterFieldInserted(formField);
  }
  static {
    n(this.prototype, "didInsert", [action]);
  }
  willDestroyAction() {
    this.args.afterFieldRemoved(this.args.formField);
  }
  static {
    n(this.prototype, "willDestroyAction", [action]);
  }
  async validateField(formField) {
    await formField.validate({
      skipUnvalidated: true
    });
  }
  static {
    n(this.prototype, "validateField", [action]);
  }
  onUserInteraction(eventName, value, event) {
    const formField = this.args.formField;
    if (this.isDestroyed || this.isDestroying || formField.disabled) {
      return;
    }
    formField.eventLog.push(eventName);
    this.validateField(formField);
    this.args.onUserInteraction(formField, eventName, value, event);
  }
  static {
    n(this.prototype, "onUserInteraction", [action]);
  }
  updateFieldValue(value) {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }
    return this.args.formField.updateValue(value);
  }
  static {
    n(this.prototype, "updateFieldValue", [action]);
  }
}
setComponentTemplate(TEMPLATE, ValidatingField);

export { ValidatingField as default };
//# sourceMappingURL=validating-field.js.map
