import { tracked } from '@glimmer/tracking';
import { TrackedArray } from 'tracked-built-ins';
import removeObjects from './remove-objects.js';
import removeAll from './remove-all.js';

export default class FormField {
  @tracked cloneCountStatus;
  @tracked clonedFields = TrackedArray.from([]);
  @tracked eventLog = TrackedArray.from([]);
  @tracked focussed;
  @tracked changeset;
  @tracked validatesOn = [];
  // BEGIN-SNIPPET field-settings-tracked-props.js
  @tracked hidden;
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

  get dynamicallyExcluded() {
    if (!this.dynamicIncludeExclude) {
      return null;
    }
    let result =
      this.dynamicIncludeExclude.default === 'exclude' ? true : false;
    if (
      this.overrideConditionsFulfilled(
        this.dynamicIncludeExclude.toggleDefault,
        this.changeset,
      )
    ) {
      result = !result;
    }
    return result;
  }

  checkCondition(changeset, condition) {
    const value = changeset.get(condition.fieldId); // Needs to use propertyName or better yet, fieldValue

    if (condition.valueEquals && (!value || value !== condition.valueEquals)) {
      return false;
    }
    if (
      condition.valueLengthEq &&
      (!value || value.length !== condition.valueLengthEq)
    ) {
      return false;
    }
    if (
      condition.valueLengthLt &&
      (!value || !(value.length < condition.valueLengthLt))
    ) {
      return false;
    }
    if (
      condition.valueLengthLte &&
      (!value || !(value.length <= condition.valueLengthLte))
    ) {
      return false;
    }
    if (
      condition.valueLengthGt &&
      (!value || !(value.length > condition.valueLengthGt))
    ) {
      return false;
    }
    if (
      condition.valueLengthGte &&
      (!value || !(value.length >= condition.valueLengthGte))
    ) {
      return false;
    }

    if (
      condition.valueIncludes &&
      (!value || !value.includes(condition.valueIncludes))
    ) {
      return false;
    }
    if (
      condition.valueExcludes &&
      (!value || value.includes(condition.valueExcludes)) // Should valueExcludes be true if value is null or undefined?
    ) {
      return false;
    }
    return true;
  }

  checkConditions(ruleSet, changeset) {
    const results = ruleSet.conditions.map((condition) => {
      if (condition.conditions) {
        return this.checkConditions(condition, changeset);
      }
      return this.checkCondition(changeset, condition);
    });
    if (ruleSet.ruleType === 'allConditionsTrue') {
      return results.includes(false) ? false : true;
    } else if (ruleSet.ruleType === 'anyConditionsTrue') {
      return results.includes(true) ? true : false;
    }
  }

  overrideConditionsFulfilled(ruleSet, changeset) {
    const results = this.checkConditions(ruleSet, changeset);
    return results;
  }

  updateValue(value, eventName = 'valueUpdated') {
    this.eventLog.push(eventName);
    var changeset = this.changeset;
    this.previousValue = changeset.get(this.propertyName);
    changeset.set(this.propertyName, value);
    this.validate();
  }

  applyDefaultValue() {
    if (this.fieldValue !== undefined) {
      return;
    }
    if (Object.prototype.hasOwnProperty.call(this, 'defaultValue')) {
      this.updateValue(this.defaultValue, 'defaultApplied');
    }
  }

  reset() {
    this.changeset.rollbackProperty(this.propertyName);
    // We use removeAll to avoid eventLog being forcibly reset as a prop, which breaks tracking
    removeAll(this.eventLog);
  }

  validate() {
    return new Promise((resolve, reject) => {
      const formField = this;
      const changeset = this.changeset;
      if (!formField.validates) {
        return;
      }
      if (!this.eventLogValidated.length) {
        return;
      }
      if (
        this.eventLogValidated.length === 1 &&
        this.eventLogValidated[0] === 'insert' &&
        !this.fieldValue
      ) {
        return;
      }
      changeset
        .validate(formField.propertyName)
        .then(() => {
          const fieldValidationErrors = changeset.error[formField.propertyName];
          resolve(fieldValidationErrors);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
