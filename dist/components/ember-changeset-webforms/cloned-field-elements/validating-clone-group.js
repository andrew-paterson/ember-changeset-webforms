import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import './validating-clone-group.css';
import { g, i, n } from 'decorator-transforms/runtime';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  data-test-id={{@dataTestFieldId}}\n  data-test-cwf-field-validates={{this.dataTestCwfFieldValidates}}\n  data-test-cwf-field-required={{this.dataTestCwfFieldRequired}}\n  data-test-class=\"cwf-field-type-{{ember-changeset-webforms/safe-name\n    @masterFormField.fieldType\n  }}\"\n  class=\"{{@masterFormField.typeClass}}\"\n  {{attrs-from-config\n    this.dynamicClassNameNameSpaces\n    @changesetWebform\n    @masterFormField\n  }}\n  {{did-insert (fn this.didInsertWrapper \"cloneGroupWrapper\")}}\n  ...attributes\n>\n  {{#if (eq @masterFormField.cloneGroupActionsPosition \"labelWrapper\")}}\n    <div\n      {{did-insert (fn this.registerElementContainer \"labelWrapper\")}}\n      {{attrs-from-config \"labelWrapper\" @changesetWebform @masterFormField}}\n      data-test-class=\"cwf-field-label-wrapper\"\n    >\n      <EmberChangesetWebforms::FieldElements::FieldLabel\n        @formField={{@masterFormField}}\n        @changesetWebform={{@changesetWebform}}\n      />\n    </div>\n  {{else}}\n    <EmberChangesetWebforms::FieldElements::FieldLabel\n      @formField={{@masterFormField}}\n      @changesetWebform={{@changesetWebform}}\n    />\n  {{/if}}\n  <div\n    data-clone-group-pre-clones\n    {{did-insert (fn this.registerElementContainer \"preClones\")}}\n  ></div>\n  <div\n    data-test-id=\"cwf-clone-group-items\"\n    {{attrs-from-config \"cloneGroupItems\" @changesetWebform @formField}}\n  >\n    {{#each @masterFormField.clonedFields as |clonedFormField|}}\n      <EmberChangesetWebforms::ClonedFieldElements::ValidatingClone\n        @cloneField={{this.cloneField}}\n        @onUserInteraction={{@onUserInteraction}}\n        @updateFieldValue={{@updateFieldValue}}\n        @validateField={{@validateField}}\n        @removeClone={{this.removeClone}}\n        @groupValue={{@groupValue}}\n        @clonedFormField={{clonedFormField}}\n        @masterFormField={{@masterFormField}}\n        @changesetWebform={{@changesetWebform}}\n      />\n    {{/each}}\n  </div>\n\n  <EmberChangesetWebforms::FieldElements::FieldErrors\n    @formField={{@masterFormField}}\n    @validationErrorsArray={{@masterFormField.masterFormFieldValidationErrors}}\n    @changesetWebform={{@changesetWebform}}\n  />\n</div>\n\n{{#if this.cloneGroupActionsDestinationElement}}\n  {{#in-element this.cloneGroupActionsDestinationElement insertBefore=null}}\n    <div\n      data-test-id=\"cwf-clone-group-actions\"\n      {{attrs-from-config \"cloneGroupActions\" @changesetWebform @formField}}\n    >\n      {{#if (eq @masterFormField.cloneCountStatus \"max\")}}\n        <div\n          {{attrs-from-config \"maxClonesReached\" @changesetWebform @formField}}\n          data-test-id=\"cwf-max-clones-reached\"\n        >{{@masterFormField.maxClonesReachedText}}</div>\n      {{else}}\n        <@masterFormField.addCloneButtonComponent.componentClass\n          @props={{@masterFormField.addCloneButtonComponent.props}}\n          @onClickAddCloneButton={{this.onClickAddCloneButton}}\n          @formField={{@masterFormField}}\n          @changesetWebform={{@changesetWebform}}\n        />\n      {{/if}}\n    </div>\n  {{/in-element}}\n{{/if}}");

class destinationElementClass {
  static {
    g(this.prototype, "cloneGroupActions", [tracked]);
  }
  #cloneGroupActions = (i(this, "cloneGroupActions"), void 0);
  static {
    g(this.prototype, "cloneGroupWrapper", [tracked]);
  }
  #cloneGroupWrapper = (i(this, "cloneGroupWrapper"), void 0);
  static {
    g(this.prototype, "preClones", [tracked]);
  }
  #preClones = (i(this, "preClones"), void 0);
  static {
    g(this.prototype, "labelWrapper", [tracked]);
  }
  #labelWrapper = (i(this, "labelWrapper"), void 0);
}
class ValidatingCloneGroup extends Component {
  static {
    g(this.prototype, "masterFormField", [tracked]);
  }
  #masterFormField = (i(this, "masterFormField"), void 0);
  static {
    g(this.prototype, "destinationElement", [tracked], function () {
      return new destinationElementClass();
    });
  }
  #destinationElement = (i(this, "destinationElement"), void 0);
  get cloneGroupActionsDestinationElement() {
    return this.destinationElement[this.args.masterFormField.cloneGroupActionsPosition];
  }
  get dynamicClassNameNameSpaces() {
    const final = ['cloneGroupWrapper'];
    const masterFormField = this.args.masterFormField;
    if (masterFormField.validates) {
      final.push('fieldValidates');
    }
    if (masterFormField.required) {
      final.push('requiredField');
    }
    return final.join(',');
  }
  didInsertWrapper(namespace, element) {
    var masterFormField = this.args.masterFormField;
    var groupValue = masterFormField.fieldValue || [];
    groupValue.forEach(() => {
      this.cloneField({
        fromData: true
      });
    });
    const emptyClones = masterFormField.minClones - groupValue.length;
    for (var i = 0; i < emptyClones; i++) {
      this.cloneField();
    }
    this.registerElementContainer(namespace, element);
  }
  static {
    n(this.prototype, "didInsertWrapper", [action]);
  }
  onClickAddCloneButton() {
    this.cloneField();
    if (this.args.onUserInteraction) {
      this.args.onUserInteraction('addClone');
    }
  }
  static {
    n(this.prototype, "onClickAddCloneButton", [action]);
  }
  cloneField(opts = {}) {
    var masterFormField = this.args.masterFormField;
    masterFormField.cloneField(opts);
  }
  static {
    n(this.prototype, "cloneField", [action]);
  }
  removeClone(clone) {
    var masterFormField = this.args.masterFormField;
    masterFormField.removeClone(clone);
    if (this.args.onUserInteraction) {
      this.args.onUserInteraction('removeClone');
    }
  }
  static {
    n(this.prototype, "removeClone", [action]);
  }
  registerElementContainer(namespace, element) {
    this.destinationElement[namespace] = element;
  }
  static {
    n(this.prototype, "registerElementContainer", [action]);
  }
}
setComponentTemplate(TEMPLATE, ValidatingCloneGroup);

export { ValidatingCloneGroup as default };
//# sourceMappingURL=validating-clone-group.js.map
