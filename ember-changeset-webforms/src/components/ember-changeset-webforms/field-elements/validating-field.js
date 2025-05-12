import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class ValidatingField extends Component {
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
    this.args.afterFieldRemoved(this.args.formField);
  }

  @action
  async validateField(formField) {
    await formField.validate({
      skipUnvalidated: true,
    });
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
    return this.args.formField.updateValue(value);
  }
}
