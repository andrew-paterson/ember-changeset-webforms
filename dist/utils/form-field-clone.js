import { tracked } from '@glimmer/tracking';
import { g, i } from 'decorator-transforms/runtime';

class FormFieldClone {
  static {
    g(this.prototype, "index", [tracked]);
  }
  #index = (i(this, "index"), undefined);
  static {
    g(this.prototype, "id", [tracked]);
  }
  #id = (i(this, "id"), undefined);
  static {
    g(this.prototype, "eventLog", [tracked], function () {
      return [];
    });
  }
  #eventLog = (i(this, "eventLog"), undefined);
  static {
    g(this.prototype, "focussed", [tracked]);
  }
  #focussed = (i(this, "focussed"), undefined);
  static {
    g(this.prototype, "changeset", [tracked]);
  }
  #changeset = (i(this, "changeset"), undefined);
  static {
    g(this.prototype, "validatesOn", [tracked], function () {
      return [];
    });
  }
  #validatesOn = (i(this, "validatesOn"), undefined);
  static {
    g(this.prototype, "hidden", [tracked]);
  }
  #hidden = (i(this, "hidden"), undefined); // BEGIN-SNIPPET cloned-field-settings-tracked-props.js
  static {
    g(this.prototype, "disabled", [tracked]);
  }
  #disabled = (i(this, "disabled"), undefined);
  static {
    g(this.prototype, "externalProps", [tracked]);
  }
  #externalProps = (i(this, "externalProps"), undefined);
  // END-SNIPPET
  constructor(args) {
    for (const key in args) {
      this[key] = args[key];
    }
  }
  get fieldValue() {
    var groupValue = this.masterFormField.fieldValue;
    var index = this.index;
    if (!groupValue) {
      return null;
    }
    return groupValue[index];
  }
  get eventLogValidated() {
    return this.validatesOn.filter(eventName => this.eventLog.includes(eventName));
  }
  get validationErrors() {
    return this.changeset.get(`error.${this.masterFormField.fieldId}.validation`) || [];
  }
  get cloneValidationErrors() {
    var index = this.index;
    const changeset = this.changeset;
    var validationErrors = changeset.get(`error.${this.masterFormField.fieldId}.validation`) || [];
    const cloneValidationErrors = validationErrors.find(item => {
      return typeof item === 'object' || item.clones;
    });
    if (!cloneValidationErrors) {
      return null;
    }
    return cloneValidationErrors.clones[index];
  }
  get validationStatus() {
    var clonedFormField = this;
    if (!clonedFormField) {
      return null;
    }
    if (!clonedFormField.showValidationWhenFocussed && clonedFormField.focussed) {
      return null;
    }
    if (!this.eventLogValidated.length) {
      return null;
    }
    var clonedFieldValidationErrors = this.cloneValidationErrors || [];
    if (clonedFieldValidationErrors.length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }
  updateValidationActivation() {
    if (this.eventLogValidated.length && this.validationRules[0]) {
      const validationRules = this.validationRules[0];
      validationRules.activateValidation = validationRules.activateValidation || [];
      validationRules.activateValidation.push(this.index);
    }
  }
}

export { FormFieldClone as default };
//# sourceMappingURL=form-field-clone.js.map
