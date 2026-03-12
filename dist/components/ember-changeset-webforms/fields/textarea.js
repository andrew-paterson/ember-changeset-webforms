import Input from './input.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<textarea\n  {{attrs-from-config \"textareaElement\" @changesetWebform @formField}}\n  value={{@formField.fieldValue}}\n  data-set-custom-validity\n  {{on \"keyup\" (fn this.onUserInteraction \"keyUp\")}}\n  {{on \"keyup\" (fn this.onUserInteraction \"keyDown\")}}\n  {{on \"blur\" (fn this.onUserInteraction \"focusOut\")}}\n  {{on \"focus\" (fn this.onUserInteraction \"focusIn\")}}\n  {{on \"change\" this.onChange}}\n  placeholder={{@formField.placeholder}}\n  readonly={{@formField.readonly}}\n  disabled={{@formField.disabled}}\n  name={{@formField.name}}\n  id={{@formField.id}}\n  ariaLabelledBy={{@formField.ariaLabelledBy}}\n  aria-label={{@formField.ariaLabel}}\n  aria-errormessage={{@formField.ariaErrorMessage}}\n  aria-describedby={{@formField.ariaDescribedBy}}\n  required={{@formField.required}}\n/>");

class Textarea extends Input {}
setComponentTemplate(TEMPLATE, Textarea);

export { Textarea as default };
//# sourceMappingURL=textarea.js.map
