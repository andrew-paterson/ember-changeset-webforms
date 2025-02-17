import { action } from '@ember/object';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<input\n  class=\"{{ember-changeset-webforms/dynamic-class-names\n      \'inputElement\'\n      @changesetWebform\n      @formField\n      @formField.validationStatus\n    }}\"\n  value={{@formField.fieldValue}}\n  {{did-insert this.didInsert}}\n  {{on \"keyup\" (fn this.onUserInteraction \"keyUp\")}}\n  {{on \"keydown\" (fn this.onUserInteraction \"keyDown\")}}\n  {{on \"blur\" (fn this.onUserInteraction \"focusOut\")}}\n  {{on \"focus\" (fn this.onUserInteraction \"focusIn\")}}\n  {{on \"change\" this.onChange}}\n  placeholder={{@formField.placeholder}}\n  autofocus={{@formField.autofocus}}\n  type={{@formField.inputType}}\n  readonly={{@formField.readonly}}\n  disabled={{@formField.disabled}}\n  name={{@formField.name}}\n  id={{@formField.id}}\n  ariaLabelledBy={{@ariaLabelledBy}}\n  aria-label={{@ariaLabel}}\n  aria-errormessage=\"{{@formField.id}}-errors\"\n  aria-describedby={{if\n    @formField.description\n    (concat @formField.id \"-description\")\n  }}\n  required={{@formField.required}}\n/>");

class Input extends Component {
  onChange(event) {
    this.args.updateFieldValue(event.target.value);
  }
  static {
    n(this.prototype, "onChange", [action]);
  }
  onUserInteraction(eventName, event) {
    const formField = this.args.formField;
    if (eventName === 'keyUp' && formField.fieldType === 'input' && event.keyCode === 13 && this.args.submitForm) {
      formField.focussed = false;
      this.args.submitForm(this.args.changesetWebform.changeset);
      return;
    }
    let value = event.target.value;
    this.args.onUserInteraction(eventName, value, event);
    if (eventName === 'keyUp') {
      this.args.updateFieldValue(value);
    } else if (eventName === 'focusOut') {
      formField.focussed = false;
      if (value && formField.trim && formField.inputType !== 'password' && typeof value === 'string') {
        value = value.trim();
      }
    } else if (eventName === 'focusIn') {
      formField.focussed = true;
    }
    if (this.args.formField.validationErrors) {
      this.element.setCustomValidity(this.args.formField.validationErrors.join(','));
    } else {
      this.element.setCustomValidity('');
    }
  }
  static {
    n(this.prototype, "onUserInteraction", [action]);
  }
  didInsert(element) {
    this.element = element;
  }
  static {
    n(this.prototype, "didInsert", [action]);
  }
}
setComponentTemplate(TEMPLATE, Input);

export { Input as default };
//# sourceMappingURL=input.js.map
