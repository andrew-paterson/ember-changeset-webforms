import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class ValidatingField extends Component {
  get typeClass() {
    var myStr = this.args.formField.fieldType;
    myStr = myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    return `field-type-${myStr}`;
  }

  get labelId() {
    return `${this.args.formField.name}-label`;
  }

  get ariaLabelledBy() {
    if (!this.args.formField.hideLabel) {
      return this.labelId;
    }
    return null;
  }

  get ariaLabel() {
    return this.args.formField.hideLabel
      ? this.args.formField.fieldLabel
      : null;
  }

  get ariaErrorMessage() {
    return (this.args.formField.validationErrors || []).length
      ? `${this.args.formField.id}-errors`
      : null;
  }

  get ariaDescribedBy() {
    return this.args.formField.fieldDescription
      ? `${this.args.formField.id}-description`
      : null;
  }

  get isGroup() {
    return this.args.formField.options ? true : null;
  }

  @action
  didInsert(element) {
    var formField = this.args.formField;
    formField.eventLog.push('insert');
    if (formField.fieldValue) {
      formField.eventLog.push('insertWithValue');
    }
    setTimeout(() => {
      formField.customValidityEls = element.querySelectorAll(
        '[data-custom-validity]',
      );
    });
    this.validateField(formField, element);
    this.args.afterFieldInserted(formField);
  }

  @action
  willDestroyAction() {
    var formField = this.args.formField;
    if (formField.isOmitted && formField.resetWhenOmitted) {
      formField.reset();
    }
    this.args.afterFieldRemoved(formField);
  }

  @action
  async validateField(formField) {
    await formField.validate({
      skipUnvalidated: true,
    });
    // this.args.afterFieldValidation(
    //   formField,
    //   formField.changeset,
    //   fieldValidationResult,
    // );
  }

  @action
  onUserInteraction(eventName, value, event) {
    const formField = this.args.formField;

    if (this.isDestroyed || this.isDestroying || formField.disabled) {
      return;
    }
    formField.eventLog.push(eventName);
    this.validateField(formField);
    this.args.onUserInteraction(formField, eventName, value, event);
  }

  @action
  updateFieldValue(value) {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }
    this.args.formField.updateValue(value);
    // if (this.args.onFieldValueChange) {
    //   this.args.onFieldValueChange(formField);
    // }
  }
}
