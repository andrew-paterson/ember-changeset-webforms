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
