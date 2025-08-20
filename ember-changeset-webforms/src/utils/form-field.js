import { tracked } from '@glimmer/tracking';
import { TrackedArray } from 'tracked-built-ins';
import removeAll from './remove-all.js';
import FormFieldClone from './form-field-clone.js';
import removeObject from './remove-object.js';
import safeName from './safe-name.js';

export default class FormField {
  @tracked cloneCountStatus;
  @tracked clonedFields = TrackedArray.from([]);
  @tracked eventLog = TrackedArray.from([]);
  @tracked focussed;
  @tracked changeset;
  @tracked validatesOn = [];
  @tracked isOmitted = false;
  // BEGIN-SNIPPET field-settings-tracked-props.js
  @tracked omitted;
  @tracked disabled;
  @tracked hideValidation;
  // END-SNIPPET
  constructor(args) {
    for (const key in args) {
      this[key] = args[key];
    }
  }

  get fieldValue() {
    // TODO check this works wehen fieldId and property name are different
    return this.changeset.get(this.propertyName);
  }

  get validationErrors() {
    // TODO check this works wehen fieldId and property name are different
    return this.changeset.get(`error.${this.propertyName}.validation`) || [];
  }

  get masterFormFieldValidationErrors() {
    const masterFormFieldValidationErrors = this.validationErrors.filter(
      (item) => {
        return typeof item !== 'object' || !item.clones;
      },
    );
    return masterFormFieldValidationErrors;
  }

  get eventLogValidated() {
    return this.validatesOn.filter((eventName) =>
      this.eventLog.includes(eventName),
    );
  }

  get validates() {
    return this.validationRules.length > 0;
  }

  get wasValidated() {
    if (!this.validates) {
      return null;
    }
    if (this.hideValidation) {
      return null;
    }
    // if (!this.showValidationWhenFocussed && this.focussed) {
    //   return null;
    // }
    if (!this.eventLogValidated.length) {
      return null;
    }
    // if (
    //   this.eventLogValidated.length === 1 &&
    //   this.eventLogValidated[0] === 'insert' &&
    //   !this.fieldValue
    // ) {
    //   return null;
    // }
    return true;
  }

  get showValidation() {
    if (!this.wasValidated) {
      return false;
    }
    if (!this.showValidationWhenFocussed && this.focussed) {
      return false;
    }
    return true;
  }

  get required() {
    return this.validationRules.find(function (rule) {
      return (
        rule.validationMethod === 'validatePresence' &&
        (rule.arguments === true || rule.arguments.presence === true)
      );
    })
      ? true
      : false;
  }

  get validationStatus() {
    if (!this.wasValidated) {
      return null;
    }
    if (this.validationErrors.length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }

  get isGroup() {
    return this.options ? true : null;
  }

  get typeClass() {
    return `cwf-field-type-${safeName(this.fieldType)}`;
  }

  get labelId() {
    return `${this.id}-label`;
  }

  get ariaLabelledBy() {
    if (!this.hideLabel && this.requiresAriaLabelledBy) {
      return this.labelId;
    }
    return null;
  }

  get ariaLabel() {
    if (this.hideLabel) {
      return this.fieldLabel;
    }
    return null;
  }

  get ariaInvalid() {
    return (this.validationErrors || []).length ? true : false;
  }

  get ariaErrorMessage() {
    return (this.validationErrors || []).length ? `${this.id}-errors` : null;
  }

  get ariaDescribedBy() {
    return this.fieldDescription ? `${this.id}-description` : null;
  }

  get isValid() {
    return this.validationStatus === 'valid';
  }

  _checkConditions(ruleSet, formField) {
    const results = ruleSet.conditions.map((condition) => {
      if (condition.conditions) {
        return this._checkConditions(condition, formField);
      }
      return this._checkCondition(formField, condition);
    });
    if (ruleSet.where === 'allConditionsTrue') {
      return results.includes(false) ? !ruleSet.returns : ruleSet.returns;
    } else if (ruleSet.where === 'anyConditionsTrue') {
      return results.includes(true) ? ruleSet.returns : !ruleSet.returns;
    }
  }

  _checkCondition(formField, condition) {
    const relatedSiblingField = formField.siblings.find((siblingField) => {
      return siblingField.fieldId === condition.fieldId;
    });
    const value = relatedSiblingField?.fieldValue;
    if (!value) {
      return false;
    }
    const dynamicIncludeExcludeConditions =
      formField.dynamicIncludeExcludeConditions || {};
    const conditionChecks = Object.assign(
      {},
      {
        valueEquals: (value, condition) => value === condition.valueEquals,
      },
      dynamicIncludeExcludeConditions,
    );
    for (var key in conditionChecks) {
      if (condition[key] && !conditionChecks[key](value, condition)) {
        return false;
      }
    }
    return true;
  }

  updateValue(value) {
    var changeset = this.changeset;
    this.snapshots.push(this.changeset.snapshot());
    this.eventLog.push('valueUpdated');
    this.previousValue = this.fieldValue;
    if (this.valueFilter && value) {
      value = this.valueFilter(value, this);
    }
    changeset.set(this.propertyName, value);
    this.validate({ skipUnvalidated: true });
    this.changesetWebform._checkOmitted();
    if (this.changesetWebform.callbacks.onFieldValueChange) {
      this.changesetWebform.callbacks.onFieldValueChange(
        this,
        this.changesetWebform,
      );
    }
  }

  setOmission(omitted) {
    this.omitted = omitted;
    this._checkOmitted();
  }

  _checkOmitted() {
    const initiallyOmitted = this.isOmitted;
    if (!this.omitted) {
      this.isOmitted = false;
      return;
    }
    if (this.omitted === true || this._checkConditions(this.omitted, this)) {
      this.isOmitted = true;
      if (
        this.eventLog.includes('insert') &&
        !initiallyOmitted &&
        this.resetWhenOmitted
      ) {
        this.reset();
      }
    } else {
      this.isOmitted = false;
    }
  }

  reset() {
    this.changeset.rollbackProperty(this.propertyName);
    // We use removeAll to avoid eventLog being forcibly reset as a prop, which breaks tracking
    removeAll(this.eventLog);
  }

  async validate(opts = {}) {
    if (!('skipUnvalidated' in opts) || opts.skipUnvalidated !== true) {
      this.eventLog.push('forceValidation');
    }
    const formField = this;
    const changeset = this.changeset;
    if (
      !formField.validates ||
      formField.isOmitted ||
      !this.eventLogValidated.length
    ) {
      return;
    }
    const res = await changeset.validate(formField.propertyName);
    this._setCustomValidity();
    // TODO document and improve opts.callbacks !== false
    if (
      opts.callbacks !== false &&
      this.changesetWebform.callbacks.afterFieldValidation
    ) {
      this.changesetWebform.callbacks.afterFieldValidation(
        this,
        this.changesetWebform,
        res[0],
      );
    }
    return res[0];
  }

  _setCustomValidity() {
    (this.customValidityEls || []).forEach((el) => {
      el.setCustomValidity((this.validationErrors || []).join());
    });
    this.clonedFields.forEach((clonedField) => {
      clonedField._setCustomValidity();
    });
  }

  pushErrors(errors) {
    this.changeset.pushErrors(this.propertyName, ...errors);
    this.eventLog.push('pushErrors');
    this._setCustomValidity();
  }

  cloneField(opts = {}) {
    var masterFormField = this;
    var newField = { ...masterFormField.clonedFieldBlueprint };
    newField.id = `${masterFormField.id}-clone-${this.cloneId(masterFormField)}`;
    newField.isClone = true;
    newField.cloneId = this.cloneId(masterFormField);
    newField.eventLog = TrackedArray.from([]); // BD must recreate this, otherwise all clones share the same instance of eventLog array.
    const clone = new FormFieldClone(newField);
    clone.changeset = this.changeset;
    clone.masterFormField = masterFormField;
    masterFormField.clonedFields.push(clone);
    clone.index = masterFormField.clonedFields.indexOf(clone);
    clone.fieldLabel = this._cloneFieldLabel(clone, masterFormField);
    clone.placeholder = this._clonePlaceholder(clone);
    var lastIndex = masterFormField.clonedFields.length - 1;
    masterFormField.lastUpdatedClone = {
      // Useful for something like swapping field values between clones.
      index: lastIndex,
      previousValue: null,
    };
    if (!opts.fromData) {
      var fieldValue = this.fieldValue || [];
      fieldValue.push(opts.newCloneValue || newField.defaultValue);
      this.updateValue(fieldValue); // TODO by not calling updatFieldValue int eh component, we don't have the action callback. Attach it to the formField instance.
    }
    this.checkMinMaxClones(masterFormField);
  }

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

  cloneId(masterFormField) {
    const startFrom = 1;
    const clonedFields = masterFormField.clonedFields;
    if (!(clonedFields || []).length) {
      return startFrom;
    }
    const sortedClones = [...clonedFields].sort((a, b) => {
      return b.cloneId - a.cloneId;
    });
    return sortedClones[0].cloneId + 1;
  }

  removeClone(clone) {
    var masterFormField = this;
    var index = masterFormField.clonedFields.indexOf(clone);
    removeObject(masterFormField.clonedFields, clone);
    this.checkMinMaxClones(masterFormField);
    var groupValue = this.fieldValue || [];
    groupValue.splice(index, 1);
    masterFormField.eventLog.push('removeClone');
    this.updateValue(groupValue); // TODO by not calling updateﬃeldValue int eh component, we don't have the action callback. Attach it to the formField instance.
    masterFormField.clonedFields.forEach((clone, index) => {
      clone.index = index;
    });
  }

  _cloneFieldLabel(clone, masterFormField) {
    if (clone.fieldLabel) {
      return typeof clone.fieldLabel === 'function'
        ? clone.fieldLabel(clone)
        : `${clone.fieldLabel} ${(clone.index + 1).toString()}`;
    }
    return `${masterFormField.fieldLabel} ${(clone.index + 1).toString()}`;
  }

  _clonePlaceholder(clone) {
    if (clone.placeholder) {
      return typeof clone.placeholder === 'function'
        ? clone.placeholder(clone)
        : `${clone.placeholder} ${(clone.index + 1).toString()}`;
    }
    return clone.fieldLabel;
  }
}
