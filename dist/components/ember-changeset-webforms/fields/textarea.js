import Input from './input.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<textarea\n  class=\"validation-area\n    {{ember-changeset-webforms/dynamic-class-names\n      \'textareaElement\'\n      @changesetWebform\n      @formField\n      @formField.validationStatus\n    }}\"\n  value={{@formField.fieldValue}}\n  {{did-insert this.didInsert}}\n  {{on \"keyup\" (fn this.onUserInteraction \"keyUp\")}}\n  {{on \"keyup\" (fn this.onUserInteraction \"keyDown\")}}\n  {{on \"blur\" (fn this.onUserInteraction \"focusOut\")}}\n  {{on \"focus\" (fn this.onUserInteraction \"focusIn\")}}\n  {{on \"change\" this.onChange}}\n  placeholder={{@formField.placeholder}}\n  autofocus={{@formField.autofocus}}\n  readonly={{@formField.readonly}}\n  disabled={{@formField.disabled}}\n  name={{@formField.name}}\n  id={{@formField.id}}\n  ariaLabelledBy={{@ariaLabelledBy}}\n  aria-label={{@ariaLabel}}\n  aria-errormessage=\"{{@formField.id}}-errors\"\n  aria-describedby=\"{{@formField.id-description}}\"\n/>");

class Textarea extends Input {}
setComponentTemplate(TEMPLATE, Textarea);

export { Textarea as default };
//# sourceMappingURL=textarea.js.map
