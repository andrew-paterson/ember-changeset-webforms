import { action } from '@ember/object';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<input\n  {{attrs-from-config \"inputElement,inputField\" @changesetWebform @formField}}\n  value={{@formField.fieldValue}}\n  {{on \"keyup\" (fn this.onUserInteraction \"keyUp\")}}\n  {{on \"keydown\" (fn this.onUserInteraction \"keyDown\")}}\n  {{on \"blur\" (fn this.onUserInteraction \"focusOut\")}}\n  {{on \"focus\" (fn this.onUserInteraction \"focusIn\")}}\n  {{on \"change\" this.onChange}}\n  placeholder={{@formField.placeholder}}\n  type={{@formField.inputType}}\n  readonly={{@formField.readonly}}\n  disabled={{@formField.disabled}}\n  name={{@formField.name}}\n  id={{@formField.id}}\n  aria-labelledby={{@formField.ariaLabelledBy}}\n  aria-label={{@formField.ariaLabel}}\n  aria-errormessage={{@formField.ariaErrorMessage}}\n  aria-describedby={{@formField.ariaDescribedBy}}\n  required={{@formField.required}}\n/>");

class Input extends Component {
  onChange(event) {
    this.args.updateFieldValue(event.target.value);
  }
  static {
    n(this.prototype, "onChange", [action]);
  }
  onUserInteraction(eventName, event) {
    const formField = this.args.formField;
    if (eventName === 'keyUp' && formField.fieldType === 'input' && event.keyCode === 13 && this.args.onFormSubmit) {
      formField.focussed = false;
      this.args.onFormSubmit(this.args.changesetWebform.changeset);
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
  }
  static {
    n(this.prototype, "onUserInteraction", [action]);
  }
}
setComponentTemplate(TEMPLATE, Input);

export { Input as default };
//# sourceMappingURL=input.js.map
