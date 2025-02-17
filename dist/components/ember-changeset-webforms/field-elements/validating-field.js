import { action } from '@ember/object';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if\n  (and\n    @changesetWebform.changeset\n    (not @formField.hidden)\n    (not @formField.dynamicallyExcluded)\n    (not-eq @formField.fieldType \"noDisplay\")\n  )\n}}\n  {{#if @formField.cloneGroupName}}\n    <EmberChangesetWebforms::ClonedFieldElements::ValidatingCloneGroup\n      @masterFormField={{@formField}}\n      @updateFieldValue={{this.updateFieldValue}}\n      @validateField={{this.validateField}}\n      @afterClickAddCloneButton={{@afterClickAddCloneButton}}\n      @onUserInteraction={{this.onUserInteraction}}\n      @dataTestFieldId={{this.dataTestFieldId}}\n      @changesetWebform={{@changesetWebform}}\n      {{did-insert this.didInsert}}\n    />\n  {{else}}\n    <EmberChangesetWebforms::FieldElements::ValidatingFieldWrapper\n      @formField={{@formField}}\n      @typeClass={{this.typeClass}}\n      @dataTestFormName={{@dataTestFormName}}\n      @dataTestFieldId={{or @dataTestId @formField.id}}\n      @changesetWebform={{@changesetWebform}}\n      @labelId={{this.labelId}}\n      @ariaLabelledBy={{this.ariaLabelledBy}}\n      @ariaLabel={{this.ariaLabel}}\n      @validationErrorsArray={{@formField.validationErrors}}\n      data-test-cwf-field\n      {{did-insert this.didInsert}}\n    >\n      <@formField.componentClass\n        @formField={{@formField}}\n        @formFields={{@formFields}}\n        @formSettings={{@formSettings}}\n        @updateFieldValue={{this.updateFieldValue}}\n        @onUserInteraction={{this.onUserInteraction}}\n        @changesetWebform={{@changesetWebform}}\n        @dataTestFieldId={{this.dataTestFieldId}}\n        @labelId={{this.labelId}}\n        @ariaLabelledBy={{this.ariaLabelledBy}}\n        @ariaLabel={{this.ariaLabel}}\n        @ariaErrorMessage={{this.ariaErrorMessage}}\n        @ariaDescribedBy={{this.ariaDescribedBy}}\n        @isGroup={{this.isGroup}}\n        @submitForm={{@submitForm}}\n      />\n      {{#if @formField.description}}\n        <EmberChangesetWebforms::FieldElements::FieldDescription\n          @description={{@formField.description}}\n          @descriptionMarkdown={{@formField.descriptionMarkdown}}\n        />\n      {{/if}}\n    </EmberChangesetWebforms::FieldElements::ValidatingFieldWrapper>\n  {{/if}}\n{{/if}}");

class ValidatingField extends Component {
  get typeClass() {
    var myStr = this.args.formField.fieldType;
    myStr = myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    return `field-type-${myStr}`;
  }
  get labelId() {
    return `${this.args.formField.name}-label`;
  }
  get ariaLabelledBy() {
    if (!this.args.formField.hideLabel) {
      return this.labelId;
    }
    return null;
  }
  get ariaLabel() {
    return this.args.formField.hideLabel ? this.args.formField.fieldLabel : null;
  }
  get ariaErrorMessage() {
    return (this.args.formField.validationErrors || []).length ? `${this.args.formField.id}-errors` : null;
  }
  get ariaDescribedBy() {
    return this.args.formField.fieldDescription ? `${this.args.formField.id}-description` : null;
  }
  get isGroup() {
    return this.args.formField.options ? true : null;
  }
  didInsert() {
    var formField = this.args.formField;
    const changeset = this.args.changesetWebform.changeset;
    if (changeset.get(formField.propertyName)) {
      formField.eventLog.push('insert');
      this.validateField(formField);
    }
    this.args.onFieldInserted(this.args.formField);
  }
  static {
    n(this.prototype, "didInsert", [action]);
  }
  validateField(formField) {
    formField.validate().then(fieldValidationErrors => {
      this.args.afterFieldValidation(formField, formField.changeset, fieldValidationErrors);
    }).catch(err => console.log(err));
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
    const formField = this.args.formField;
    formField.updateValue(value);
    this.validateField(formField);
    if (this.args.onFieldValueChange) {
      this.args.onFieldValueChange(formField, this.args.changesetWebform.changeset);
    }
  }
  static {
    n(this.prototype, "updateFieldValue", [action]);
  }
}
setComponentTemplate(TEMPLATE, ValidatingField);

export { ValidatingField as default };
//# sourceMappingURL=validating-field.js.map
