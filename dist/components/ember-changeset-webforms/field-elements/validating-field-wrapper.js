import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { g, i, n } from 'decorator-transforms/runtime';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<EmberChangesetWebforms::FieldElements::ValidatingFieldWrapperElement\n  @formField={{@formField}}\n  data-test-cwf-field-wrapper={{not @formField.isClone}}\n  data-test-cwf-clone-wrapper={{@formField.isClone}}\n  data-test-class={{@formField.typeClass}}\n  data-test-cwf-field-validates={{@formField.validates}}\n  data-test-cwf-field-required={{@formField.required}}\n  data-test-id={{@dataTestFieldId}}\n  data-test-validates={{@formField.validates}}\n  data-test-was-validated={{@formField.wasValidated}}\n  data-test-validation-status={{@formField.validationStatus}}\n  class=\"{{@formField.typeClass}}\"\n  {{attrs-from-config\n    this.attrsFromConfigNameSpaces\n    @changesetWebform\n    @formField\n  }}\n  {{did-insert (fn this.registerElementContainer \"fieldWrapperEl\")}}\n  ...attributes\n>\n  {{#if this.hasFieldActions}}\n    <div\n      data-field-actions\n      {{did-insert (fn this.registerElementContainer \"fieldActions\")}}\n    ></div>\n  {{/if}}\n  {{#if @formField.isClone}}\n    <div\n      data-field-content\n      {{did-insert (fn this.registerElementContainer \"fieldContents\")}}\n    ></div>\n  {{/if}}\n  {{#if this.fieldContentsDestinationElement}}\n    {{#in-element this.fieldContentsDestinationElement insertBefore=null}}\n      <EmberChangesetWebforms::FieldElements::FieldLabel\n        @formField={{@formField}}\n        @changesetWebform={{@changesetWebform}}\n        @labelId={{@labelId}}\n      />\n      <EmberChangesetWebforms::FieldElements::FieldDescription\n        @formField={{@formField}}\n        @changesetWebform={{@changesetWebform}}\n      />\n      <div\n        {{attrs-from-config\n          (if @formField.isClone \"cloneFieldControls\" \"fieldControls\")\n          @changesetWebform\n          @formField\n        }}\n        role={{if @formField.isGroup \"group\"}}\n        data-test-id=\"field-controls\"\n      >\n        {{yield}}\n      </div>\n\n      <EmberChangesetWebforms::FieldElements::FieldErrors\n        @formField={{@formField}}\n        @changesetWebform={{@changesetWebform}}\n        @validationErrorsArray={{@validationErrorsArray}}\n      />\n    {{/in-element}}\n  {{/if}}\n  {{#if this.cloneActionsDestinationElement}}\n    {{#in-element this.cloneActionsDestinationElement insertBefore=null}}\n      <EmberChangesetWebforms::ClonedFieldElements::RemoveCloneButton\n        @formField={{@formField}}\n        @masterFormField={{@masterFormField}}\n        @removeClone={{@removeClone}}\n        @changesetWebform={{@changesetWebform}}\n      />\n    {{/in-element}}\n  {{/if}}\n</EmberChangesetWebforms::FieldElements::ValidatingFieldWrapperElement>");

class destinationElementClass {
  static {
    g(this.prototype, "fieldActions", [tracked]);
  }
  #fieldActions = (i(this, "fieldActions"), void 0);
  static {
    g(this.prototype, "fieldContents", [tracked]);
  }
  #fieldContents = (i(this, "fieldContents"), void 0);
  static {
    g(this.prototype, "fieldWrapperEl", [tracked]);
  }
  #fieldWrapperEl = (i(this, "fieldWrapperEl"), void 0);
}
class ValidatingFieldWrapper extends Component {
  static {
    g(this.prototype, "destinationElement", [tracked], function () {
      return new destinationElementClass();
    });
  }
  #destinationElement = (i(this, "destinationElement"), void 0);
  get dynamicClassNameNameSpaces() {
    this.args.formField;
    const final = [];
    return final.join(',');
  }
  get attrsFromConfigNameSpaces() {
    const final = ['focussedField', 'disabledField', 'validatedField'];
    const formField = this.args.formField;
    final.push(formField.isClone ? 'cloneWrapper' : 'fieldWrapper');
    if (formField.validates) {
      final.push('validatingField');
    }
    if (formField.required) {
      final.push('requiredField');
    }
    if (formField.isClone && this.hasFieldActions) {
      final.push('cloneWrapperWithRemoveButton');
    }
    return final.filter((item, index) => final.indexOf(item) === index).join(',');
  }
  get hasFieldActions() {
    return this.args.formField.isClone && this.args.masterFormField.cloneCountStatus !== 'min';
  }
  get fieldContentsDestinationElement() {
    return this.args.formField.isClone ? this.destinationElement.fieldContents : this.destinationElement.fieldWrapperEl;
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
