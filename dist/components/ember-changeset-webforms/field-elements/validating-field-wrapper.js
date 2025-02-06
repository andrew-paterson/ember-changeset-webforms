import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { g, i, n } from 'decorator-transforms/runtime';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<EmberChangesetWebforms::FieldElements::ValidatingFieldWrapperElement\n  @formField={{@formField}}\n  data-test-cwf-field-wrapper={{not @formField.isClone}}\n  data-test-cwf-clone-wrapper={{@formField.isClone}}\n  data-test-class={{this.dataTestClass}}\n  data-test-cwf-field-validates={{this.formField.validates}}\n  data-test-cwf-field-required={{this.formField.required}}\n  data-test-id={{this.dataTestId}}\n  data-test-validates={{@formField.validates}}\n  data-test-was-validated={{@formField.wasValidated}}\n  data-test-validation-status={{@formField.validationStatus}}\n  class=\"{{@typeClass}}\n    {{if\n      @formField.isClone\n      (ember-changeset-webforms/dynamic-class-names\n        \'cloneWrapper\' @changesetWebform @formField\n      )\n      (ember-changeset-webforms/dynamic-class-names\n        \'fieldWrapper\' @changesetWebform @formField\n      )\n    }}\n    {{if\n      @formField.focussed\n      (ember-changeset-webforms/dynamic-class-names\n        \'focussedField\' @changesetWebform @formField\n      )\n    }}\n    {{if\n      @formField.disabled\n      (ember-changeset-webforms/dynamic-class-names\n        \'disabledField\' @changesetWebform @formField\n      )\n    }}\n    {{if\n      @formField.validates\n      (ember-changeset-webforms/dynamic-class-names\n        \'fieldValidates\' @changesetWebform @formField\n      )\n    }}\n    {{if\n      @formField.wasValidated\n      (ember-changeset-webforms/dynamic-class-names\n        \'validatedField\' @changesetWebform @formField\n      )\n    }}\n    {{if\n      @formField.required\n      (ember-changeset-webforms/dynamic-class-names\n        \'requiredField\' @changesetWebform @formField\n      )\n    }}\n    {{if @formField.readonly \'readonly\'}}\n    {{if @formField.hideSuccessValidation \'hide-success-validation\'}}\"\n  {{did-insert (fn this.registerElementContainer \"fieldWrapper\")}}\n  ...attributes\n>\n  {{#if this.hasFieldActions}}\n    <div\n      data-field-actions\n      {{did-insert (fn this.registerElementContainer \"fieldActions\")}}\n    ></div>\n    <div\n      data-field-content\n      {{did-insert (fn this.registerElementContainer \"fieldContents\")}}\n    ></div>\n  {{/if}}\n  {{#if this.fieldContentsDestinationElement}}\n    {{#in-element this.fieldContentsDestinationElement insertBefore=null}}\n      <EmberChangesetWebforms::FieldElements::FieldLabel\n        @formField={{@formField}}\n        @changesetWebform={{@changesetWebform}}\n        @labelId={{@labelId}}\n      />\n      <div\n        class=\"{{ember-changeset-webforms/dynamic-class-names\n            \'fieldControls\'\n            @changesetWebform\n            @formField\n            @formField.validationStatus\n          }}\"\n        role={{if @isGroup \"group\"}}\n        ariaLabelledBy={{if @isGroup @ariaLabelledBy}}\n        aria-label={{if @isGroup @ariaLabel}}\n      >\n        {{yield}}\n      </div>\n      <EmberChangesetWebforms::FieldElements::FieldDescription\n        @formField={{@formField}}\n        @changesetWebform={{@changesetWebform}}\n      />\n      <EmberChangesetWebforms::FieldElements::FieldErrors\n        @formField={{@formField}}\n        @changesetWebform={{@changesetWebform}}\n        @validationErrorsArray={{@validationErrorsArray}}\n      />\n    {{/in-element}}\n  {{/if}}\n  {{#if this.cloneActionsDestinationElement}}\n    {{#in-element this.cloneActionsDestinationElement insertBefore=null}}\n      <EmberChangesetWebforms::ClonedFieldElements::RemoveCloneButton\n        @formField={{@formField}}\n        @masterFormField={{@masterFormField}}\n        @removeClone={{@removeClone}}\n        @changesetWebform={{@changesetWebform}}\n      />\n    {{/in-element}}\n  {{/if}}\n</EmberChangesetWebforms::FieldElements::ValidatingFieldWrapperElement>");

class destinationElementClass {
  static {
    g(this.prototype, "fieldActions", [tracked]);
  }
  #fieldActions = (i(this, "fieldActions"), undefined);
  static {
    g(this.prototype, "fieldContents", [tracked]);
  }
  #fieldContents = (i(this, "fieldContents"), undefined);
  static {
    g(this.prototype, "fieldWrapper", [tracked]);
  }
  #fieldWrapper = (i(this, "fieldWrapper"), undefined);
}
class ValidatingFieldWrapper extends Component {
  static {
    g(this.prototype, "destinationElement", [tracked], function () {
      return new destinationElementClass();
    });
  }
  #destinationElement = (i(this, "destinationElement"), undefined);
  get dataTestId() {
    if (!this.args.dataTestFieldId) {
      return null;
    }
    return `${this.args.dataTestFieldId}`;
  }
  get dataTestClass() {
    if (!this.args.typeClass) {
      return null;
    }
    return `cwf-${this.args.typeClass}`;
  }
  get isGroup() {
    return this.args.formField.options ? true : null;
  }
  get hasFieldActions() {
    return this.args.formField.isClone && this.args.masterFormField.cloneCountStatus !== 'min';
  }
  get fieldContentsDestinationElement() {
    return this.hasFieldActions ? this.destinationElement.fieldContents : this.destinationElement.fieldWrapper;
  }
  get cloneActionsDestinationElement() {
    return this.destinationElement[this.args.formField.cloneActionsPosition];
  }
  registerElementContainer(namespace, element) {
    this.destinationElement[namespace] = element;
  }
  static {
    n(this.prototype, "registerElementContainer", [action]);
  }
}
setComponentTemplate(TEMPLATE, ValidatingFieldWrapper);

export { ValidatingFieldWrapper as default };
//# sourceMappingURL=validating-field-wrapper.js.map
