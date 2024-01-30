import { action } from '@ember/object';
import Component from '@glimmer/component';
import FormFieldClone from 'ember-changeset-webforms/utils/form-field-clone';
import validationEventLog from 'ember-changeset-webforms/utils/validation-event-log';
import { tracked } from '@glimmer/tracking';

export default class ValidatingCloneGroup extends Component {
  @tracked masterFormField;

  get dataTestCwfFieldValidates() {
    return this.args.masterFormField.validates;
  }

  get dataTestCwfFieldRequired() {
    return this.args.masterFormField.required;
  }

  get dataTestId() {
    return `clone-group-${this.args.masterFormField.fieldId}`;
  }

  get validationStatus() {
    var formField = this.args.masterFormField;
    if (!formField) {
      return;
    }
    if (
      !validationEventLog(formField).filter((item) => !item.endsWith('Clone'))
        .length
    ) {
      return;
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

  cloneId(clonedFields) {
    if (!(clonedFields || []).length) {
      return 0;
    }
    const sortedClones = [...clonedFields].sort((a, b) => {
      return b.cloneId - a.cloneId;
    });
    return sortedClones[0].cloneId + 1;
  }

  @action
  didInsert() {
    var masterFormField = this.args.masterFormField;
    const changeset = this.args.changesetWebform.changeset;
    var groupValue = changeset.get(masterFormField.propertyName) || [];
    groupValue.forEach(() => {
      this.cloneField({ fromData: true }); // this.send
    });
    const emptyClones = masterFormField.minClones - groupValue.length;
    for (var i = 0; i < emptyClones; i++) {
      this.cloneField(); // this.send
    }
  }

  @action
  onClickAddCloneButton() {
    this.cloneField(); // this.send
    if (this.args.onUserInteraction) {
      this.args.onUserInteraction(this.args.masterFormField, 'addClone');
    }
  }

  @action
  cloneField(opts = {}) {
    var masterFormField = this.args.masterFormField;
    // masterFormField.set('clonedFields', masterFormField.clonedFields || []);
    masterFormField.clonedFields = masterFormField.clonedFields || [];
    var newField = { ...masterFormField.clonedFieldBlueprint };
    newField.isClone = true;
    newField.cloneId = this.cloneId(masterFormField.clonedFields);
    newField.eventLog = []; // BD must recreate this, otherwise all clones share the same instance of eventLog array.
    const clone = new FormFieldClone(newField);
    clone.changeset = this.args.changesetWebform.changeset;
    clone.masterFormField = masterFormField;
    masterFormField.clonedFields.pushObject(clone);
    masterFormField.clonedFields = masterFormField.clonedFields;
    clone.index = masterFormField.clonedFields.indexOf(clone);
    var lastIndex = masterFormField.clonedFields.length - 1;
    masterFormField.lastUpdatedClone = {
      // TODO does lastUpdatedClone do anything?
      index: lastIndex,
      previousValue: null,
    };
    if (!opts.fromData) {
      var fieldValue =
        this.args.changesetWebform.changeset.get(
          masterFormField.propertyName,
        ) || [];
      fieldValue.push(opts.newCloneValue || newField.defaultValue);
      this.args.setFieldValue(fieldValue, masterFormField);
    }

    this.checkMinMaxClones(masterFormField); // this.send
    // onUserInteraction is not fired here, as this function can be run automatically when inserting clones to match initial field data.
    if (this.args.afterAddClone) {
      this.args.afterAddClone(
        newField,
        masterFormField,
        this.args.changesetWebform,
      );
    }
    // this.args.masterFormField = masterFormField; // TODO refactor
  }

  @action
  removeClone(clone) {
    var masterFormField = this.args.masterFormField;
    var index = masterFormField.clonedFields.indexOf(clone);

    masterFormField.clonedFields.removeObject(clone);
    this.checkMinMaxClones(masterFormField); // this.send
    var groupValue =
      this.args.changesetWebform.changeset.get(masterFormField.propertyName) ||
      []; //TODO check this.
    groupValue.splice(index, 1);
    masterFormField.eventLog.pushObject('removeClone');
    this.args.setFieldValue(groupValue, masterFormField);

    masterFormField.clonedFields.forEach((clone, index) => {
      clone.index = index;
    });
    if (this.args.onUserInteraction) {
      this.args.onUserInteraction(this.args.masterFormField, 'removeClone');
    }
  }

  @action
  checkMinMaxClones(masterFormField) {
    if (
      masterFormField.maxClones &&
      masterFormField.clonedFields.length >= masterFormField.maxClones
    ) {
      masterFormField.cloneCountStatus = 'max';
    } else if (
      masterFormField.minClones &&
      masterFormField.clonedFields.length === masterFormField.minClones
    ) {
      masterFormField.cloneCountStatus = 'min';
    } else {
      masterFormField.cloneCountStatus = null;
    }
  }
}
