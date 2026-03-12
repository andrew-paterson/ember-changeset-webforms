import { action } from '@ember/object';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<EmberChangesetWebforms::FieldElements::ValidatingFieldWrapper\n  @formField={{@clonedFormField}}\n  @masterFormField={{@masterFormField}}\n  @removeClone={{@removeClone}}\n  @changesetWebform={{@changesetWebform}}\n  @validationErrorsArray={{@clonedFormField.cloneValidationErrors}}\n  @labelId={{@clonedFormField.labelId}}\n  data-test-class=\"{{@masterFormField.id}}-clone\"\n  data-test-id=\"{{@clonedFormField.id}}\"\n  {{did-insert this.didInsert}}\n>\n  <@clonedFormField.componentClass\n    @formField={{@clonedFormField}}\n    @clonedFormField={{@clonedFormField}}\n    @masterFormField={{@masterFormField}}\n    @onUserInteraction={{this.onUserInteractionClone}}\n    @updateFieldValue={{this.updateCloneValue}}\n    @cloneField={{@cloneField}}\n    @removeClone={{@removeClone}}\n    @changesetWebform={{@changesetWebform}}\n    @labelId={{@clonedFormField.labelId}}\n  />\n</EmberChangesetWebforms::FieldElements::ValidatingFieldWrapper>");

class ValidatingClone extends Component {
  didInsert(element) {
    this.args.clonedFormField.eventLog.push('insert');
    this.args.masterFormField.eventLog.push('insertClone');
    if (this.args.clonedFormField.fieldValue) {
      this.args.clonedFormField.eventLog.push('insertWithValue');
      this.args.masterFormField.eventLog.push('insertWithValueClone');
    }
    this.args.clonedFormField.updateValidationActivation();
    setTimeout(() => {
      this.args.clonedFormField.customValidityEls = element.querySelectorAll('[data-set-custom-validity]');
      this.args.validateField(this.args.masterFormField);
    });
  }
  static {
    n(this.prototype, "didInsert", [action]);
  }
  onUserInteractionClone(eventName) {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }
    const clonedFormField = this.args.clonedFormField;
    if (eventName === 'focusOut') {
      clonedFormField.focussed = false;
    } else if (eventName === 'focusIn') {
      clonedFormField.focussed = true;
    }
    clonedFormField.eventLog.push(eventName);
    this.args.masterFormField.eventLog.push(`${eventName}Clone`);
    clonedFormField.updateValidationActivation();
    this.args.onUserInteraction(`${eventName}Clone`);
  }
  static {
    n(this.prototype, "onUserInteractionClone", [action]);
  }
  updateCloneValue(value) {
    const clonedFormField = this.args.clonedFormField;
    this.args.clonedFormField.eventLog.push('valueUpdated');
    this.args.masterFormField.eventLog.push('valueUpdatedClone');
    clonedFormField.updateValidationActivation();
    this.args.updateFieldValue(this.updatedGroupValue(value, clonedFormField.index, this.args.masterFormField), this.args.masterFormField);
  }
  static {
    n(this.prototype, "updateCloneValue", [action]);
  }
  updatedGroupValue(value, index, masterFormField) {
    var groupValue = this.args.changesetWebform.changeset.get(masterFormField.propertyName) || [];
    if (groupValue[index] === value) {
      return groupValue; // TODO tests // Because if groupValue is an array of models, and itself a model property, you get this error: "You can only 'replaceRelatedRecord' on a belongsTo relationship. *** is a hasMany". In the case, the field should have updated the value by now anyway.
    }
    masterFormField.lastUpdatedClone = {
      index: index,
      previousValue: groupValue[index],
      previousLength: groupValue.length
    };
    groupValue[index] = value;
    return groupValue;
  }
}
setComponentTemplate(TEMPLATE, ValidatingClone);

export { ValidatingClone as default };
//# sourceMappingURL=validating-clone.js.map
