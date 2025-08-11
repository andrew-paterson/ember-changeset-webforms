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

  get cloneGroupActionsDestinationElement() {
    return this.destinationElement[
      this.args.masterFormField.cloneGroupActionsPosition
    ];
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
