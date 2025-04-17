import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import './validating-clone-group.css';

class destinationElementClass {
  @tracked cloneGroupActions;
  @tracked cloneGroupWrapper;
  @tracked preClones;
  @tracked labelWrapper;
}

export default class ValidatingCloneGroup extends Component {
  @tracked masterFormField;
  @tracked destinationElement = new destinationElementClass();

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
    if (
      !formField.eventLogValidated.filter((item) => !item.endsWith('Clone'))
        .length
    ) {
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
    return this.destinationElement[
      this.args.masterFormField.cloneGroupActionsPosition
    ];
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

  @action
  didInsertWrapper(namespace, element) {
    var masterFormField = this.args.masterFormField;
    var groupValue = masterFormField.fieldValue || [];
    groupValue.forEach(() => {
      this.cloneField({ fromData: true });
    });
    const emptyClones = masterFormField.minClones - groupValue.length;
    for (var i = 0; i < emptyClones; i++) {
      this.cloneField();
    }
    this.registerElementContainer(namespace, element);
  }

  @action
  onClickAddCloneButton() {
    this.cloneField();
    if (this.args.onUserInteraction) {
      this.args.onUserInteraction('addClone');
    }
  }

  @action
  cloneField(opts = {}) {
    var masterFormField = this.args.masterFormField;
    masterFormField.cloneField(opts);
  }

  @action
  removeClone(clone) {
    var masterFormField = this.args.masterFormField;
    masterFormField.removeClone(clone);
    if (this.args.onUserInteraction) {
      this.args.onUserInteraction('removeClone');
    }
  }

  @action
  registerElementContainer(namespace, element) {
    this.destinationElement[namespace] = element;
  }
}
