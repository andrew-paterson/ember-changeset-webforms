import { tracked } from '@glimmer/tracking';
import { TrackedArray } from 'tracked-built-ins';
import removeAll from './remove-all.js';

export default class FormField {
  @tracked cloneCountStatus;
  @tracked clonedFields = TrackedArray.from([]);
  @tracked eventLog = TrackedArray.from([]);
  @tracked focussed;
  @tracked changeset;
  @tracked validatesOn = [];
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

  get wasValidated() {
    if (!this.validates) {
      return null;
    }
    if (this.hideValidation) {
      return null;
    }
    if (!this.showValidationWhenFocussed && this.focussed) {
      return null;
    }
    if (!this.eventLogValidated.length) {
      return null;
    }
    if (
      this.eventLogValidated.length === 1 &&
      this.eventLogValidated[0] === 'insert' &&
      !this.fieldValue
    ) {
      return null;
    }
    return true;
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

  get isOmitted() {
    if (!this.omitted) {
      return false;
    }
    if (this.omitted === true) {
      return this.omitted;
    }
    return this._checkConditions(this.omitted, this);
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

  updateValue(value, eventName = 'valueUpdated') {
    this.snapshots.push(this.changeset.snapshot());
    this.eventLog.push(eventName);
    var changeset = this.changeset;
    this.previousValue = changeset.get(this.propertyName);
    changeset.set(this.propertyName, value);
    this.validate({ skipUnvalidated: true });
  }

  applyDefaultValue() {
    if (this.fieldValue !== undefined) {
      return;
    }
    if (Object.prototype.hasOwnProperty.call(this, 'defaultValue')) {
      this.updateValue(this.defaultValue, 'defaultApplied');
    }
  }

  setOmission(omitted) {
    if (omitted) {
      if (this.resetWhenOmitted) {
        this.reset();
      }
    }
    this.omitted = omitted;
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
    return await this.validateField();
  }

  async validateField() {
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
    return res[this.index];
  }
}
