import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import FormFieldClone from '../../../utils/form-field-clone.js';
import removeObject from '../../../utils/remove-object.js';
import './validating-clone-group.css';
import { g, i, n } from 'decorator-transforms/runtime';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  data-test-id={{this.dataTestId}}\n  data-test-cwf-field-validates={{this.dataTestCwfFieldValidates}}\n  data-test-cwf-field-required={{this.dataTestCwfFieldRequired}}\n  class=\"clone-group cwf-clone-group\n    {{this.cloneGroupNameClass}}\n    {{this.validationStatus}}\n    {{this.masterFormField.fieldClassNames}}\n    {{this.typeClass}}\n    {{if this.masterFormField.required \'required\'}}\n    {{if this.disabled \'disabled\'}}\n    {{if this.readonly \'readonly\'}}\n    {{if this.masterFormField.hideSuccessValidation \'hide-success-validation\'}}\n    {{if this.masterFormField.validates \'validates\'}}\n    {{if this.masterFormField.focussed \'focussed\'}}\"\n  {{did-insert (fn this.didInsertWrapper \"cloneGroupWrapper\")}}\n  ...attributes\n>\n  {{#if (eq @masterFormField.cloneGroupActionsPosition \"labelWrapper\")}}\n    <div\n      {{did-insert (fn this.registerElementContainer \"labelWrapper\")}}\n      class={{ember-changeset-webforms/dynamic-class-names\n        \"labelWrapper\"\n        @changesetWebform\n        @masterFormField\n        @masterFormField.validationStatus\n      }}\n    >\n      <EmberChangesetWebforms::FieldElements::FieldLabel\n        @formField={{@masterFormField}}\n        @changesetWebform={{@changesetWebform}}\n      />\n    </div>\n  {{else}}\n    <EmberChangesetWebforms::FieldElements::FieldLabel\n      @formField={{@masterFormField}}\n      @changesetWebform={{@changesetWebform}}\n    />\n  {{/if}}\n\n  <EmberChangesetWebforms::FieldElements::FieldErrors\n    @formField={{@masterFormField}}\n    @validationErrorsArray={{@masterFormField.masterFormFieldValidationErrors}}\n    class=\"clone-group-field-errors\"\n  />\n  <div\n    data-clone-group-pre-clones\n    {{did-insert (fn this.registerElementContainer \"preClones\")}}\n  ></div>\n  <div class=\"clone-group-items\">\n    {{#each @masterFormField.clonedFields as |clonedFormField|}}\n      <EmberChangesetWebforms::ClonedFieldElements::ValidatingClone\n        @cloneField={{this.cloneField}}\n        @onUserInteraction={{@onUserInteraction}}\n        @updateFieldValue={{@updateFieldValue}}\n        @validateField={{@validateField}}\n        @removeClone={{this.removeClone}}\n        @groupValue={{@groupValue}}\n        @clonedFormField={{clonedFormField}}\n        @masterFormField={{@masterFormField}}\n        @changesetWebform={{@changesetWebform}}\n      />\n    {{/each}}\n  </div>\n\n</div>\n\n{{#if this.cloneGroupActionsDestinationElement}}\n  {{#in-element this.cloneGroupActionsDestinationElement insertBefore=null}}\n    <div\n      class={{ember-changeset-webforms/dynamic-class-names\n        \"cloneGroupActions\"\n        @changesetWebform\n        @formField\n        @formField.validationStatus\n      }}\n    >\n      {{#if (eq @masterFormField.cloneCountStatus \"max\")}}\n        <div\n          class={{ember-changeset-webforms/dynamic-class-names\n            \"maxClonesReached\"\n            @changesetWebform\n            @formField\n            @formField.validationStatus\n          }}\n          data-test-id=\"cwf-max-clones-reached\"\n        >{{@masterFormField.maxClonesReachedText}}</div>\n      {{else}}\n        <@masterFormField.addCloneButtonComponent.componentClass\n          @props={{@masterFormField.addCloneButtonComponent.props}}\n          @onClickAddCloneButton={{this.onClickAddCloneButton}}\n          @formField={{@masterFormField}}\n          @cloneFieldLabel={{get @masterFormField.clonedFields \"0.fieldLabel\"}}\n          @changesetWebform={{@changesetWebform}}\n        />\n      {{/if}}\n    </div>\n  {{/in-element}}\n{{/if}}");

class destinationElementClass {
  static {
    g(this.prototype, "cloneGroupActions", [tracked]);
  }
  #cloneGroupActions = (i(this, "cloneGroupActions"), undefined);
  static {
    g(this.prototype, "cloneGroupWrapper", [tracked]);
  }
  #cloneGroupWrapper = (i(this, "cloneGroupWrapper"), undefined);
  static {
    g(this.prototype, "preClones", [tracked]);
  }
  #preClones = (i(this, "preClones"), undefined);
  static {
    g(this.prototype, "labelWrapper", [tracked]);
  }
  #labelWrapper = (i(this, "labelWrapper"), undefined);
}
class ValidatingCloneGroup extends Component {
  static {
    g(this.prototype, "masterFormField", [tracked]);
  }
  #masterFormField = (i(this, "masterFormField"), undefined);
  static {
    g(this.prototype, "destinationElement", [tracked], function () {
      return new destinationElementClass();
    });
  }
  #destinationElement = (i(this, "destinationElement"), undefined);
  get dataTestCwfFieldValidates() {
    return this.args.masterFormField.validates;
  }
  get dataTestCwfFieldRequired() {
    return this.args.masterFormField.required;
  }
  get dataTestId() {
    return `clone-group-${this.args.masterFormField.id}`;
  }
  get validationStatus() {
    var formField = this.args.masterFormField;
    if (!formField) {
      return null;
    }
    if (!formField.eventLogValidated.filter(item => !item.endsWith('Clone')).length) {
      return null;
    }
    var validationErrors = this.args.masterFormFieldValidationErrors || [];
    if (validationErrors.length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }
  get cloneGroupNameClass() {
    return `clone-group-${this.args.masterFormField.cloneGroupName}`;
  }
  get cloneGroupActionsDestinationElement() {
    return this.destinationElement[this.args.masterFormField.cloneGroupActionsPosition];
  }
  cloneId(masterFormField) {
    const clonedFields = masterFormField.clonedFields;
    if (!(clonedFields || []).length) {
      return 0;
    }
    const sortedClones = [...clonedFields].sort((a, b) => {
      return b.cloneId - a.cloneId;
    });
    return sortedClones[0].cloneId + 1;
  }
  didInsertWrapper(namespace, element) {
    var masterFormField = this.args.masterFormField;
    const changeset = this.args.changesetWebform.changeset;
    var groupValue = changeset.get(masterFormField.propertyName) || [];
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
    masterFormField.clonedFields = masterFormField.clonedFields || [];
    var newField = {
      ...masterFormField.clonedFieldBlueprint
    };
    newField.id = `${masterFormField.id}-clone-${this.cloneId(masterFormField)}`;
    newField.isClone = true;
    newField.cloneId = this.cloneId(masterFormField);
    newField.eventLog = []; // BD must recreate this, otherwise all clones share the same instance of eventLog array.
    const clone = new FormFieldClone(newField);
    clone.changeset = this.args.changesetWebform.changeset;
    clone.masterFormField = masterFormField;
    masterFormField.clonedFields.push(clone);
    // masterFormField.clonedFields = masterFormField.clonedFields;
    clone.index = masterFormField.clonedFields.indexOf(clone);
    var lastIndex = masterFormField.clonedFields.length - 1;
    masterFormField.lastUpdatedClone = {
      // Useful for something like swapping field values between clones.
      index: lastIndex,
      previousValue: null
    };
    if (!opts.fromData) {
      var fieldValue = this.args.changesetWebform.changeset.get(masterFormField.propertyName) || [];
      fieldValue.push(opts.newCloneValue || newField.defaultValue);
      this.args.updateFieldValue(fieldValue, masterFormField);
    }
    this.checkMinMaxClones(masterFormField);
  }
  static {
    n(this.prototype, "cloneField", [action]);
  }
  removeClone(clone) {
    var masterFormField = this.args.masterFormField;
    var index = masterFormField.clonedFields.indexOf(clone);
    removeObject(masterFormField.clonedFields, clone);
    this.checkMinMaxClones(masterFormField);
    var groupValue = this.args.changesetWebform.changeset.get(masterFormField.propertyName) || []; //TODO check this.
    groupValue.splice(index, 1);
    masterFormField.eventLog.push('removeClone');
    this.args.updateFieldValue(groupValue, masterFormField);
    masterFormField.clonedFields.forEach((clone, index) => {
      clone.index = index;
    });
    if (this.args.onUserInteraction) {
      this.args.onUserInteraction('removeClone');
    }
  }
  static {
    n(this.prototype, "removeClone", [action]);
  }
  checkMinMaxClones(masterFormField) {
    if (masterFormField.maxClones && masterFormField.clonedFields.length >= masterFormField.maxClones) {
      masterFormField.cloneCountStatus = 'max';
    } else if (masterFormField.minClones && masterFormField.clonedFields.length === masterFormField.minClones) {
      masterFormField.cloneCountStatus = 'min';
    } else {
      masterFormField.cloneCountStatus = null;
    }
  }
  static {
    n(this.prototype, "checkMinMaxClones", [action]);
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
