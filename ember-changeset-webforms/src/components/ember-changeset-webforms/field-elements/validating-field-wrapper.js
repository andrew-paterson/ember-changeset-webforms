import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

class destinationElementClass {
  @tracked fieldActions;
  @tracked fieldContents;
  @tracked fieldWrapperEl;
}

export default class ValidatingFieldWrapper extends Component {
  @tracked destinationElement = new destinationElementClass();

  get dynamicClassNameNameSpaces() {
    const formField = this.args.formField;
    const final = [];

    return final.join(',');
  }

  get attrsFromConfigNameSpaces() {
    const final = [];
    const formField = this.args.formField;
    final.push(formField.isClone ? 'cloneWrapper' : 'fieldWrapper');
    if (formField.focussed) {
      final.push('focussedField');
    }
    if (formField.disabled) {
      final.push('disabledField');
    }
    if (formField.showValidation) {
      final.push('validatedField');
    }
    if (formField.required) {
      final.push('requiredField');
    }
    if (formField.validates) {
      final.push('validatingField');
    }
    if (formField.required) {
      final.push('requiredField');
    }
    if (formField.isClone && this.hasFieldActions) {
      final.push('cloneWrapperWithRemoveButton');
    }
    return final
      .filter((item, index) => final.indexOf(item) === index)
      .join(',');
  }

  get hasFieldActions() {
    return (
      this.args.formField.isClone &&
      this.args.masterFormField.cloneCountStatus !== 'min'
    );
  }

  get fieldContentsDestinationElement() {
    return this.args.formField.isClone
      ? this.destinationElement.fieldContents
      : this.destinationElement.fieldWrapperEl;
  }

  get cloneActionsDestinationElement() {
    return this.destinationElement[this.args.formField.cloneActionsPosition];
  }

  @action
  registerElementContainer(namespace, element) {
    this.destinationElement[namespace] = element;
  }
}
