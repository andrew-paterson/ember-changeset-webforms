import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<button\n  type=\"button\"\n  data-test-id=\"cwf-clear-form-button\"\n  {{on \"click\" (fn @clearForm @changesetWebform)}}\n  {{attrs-from-config \"buttonElement,clearFormButton\" @changesetWebform}}\n>\n  {{#if @formSettings.clearFormButtonIcon}}\n    <@formSettings.clearFormButtonIcon.componentClass\n      @props={{@formSettings.clearFormButtonIcon.props}}\n      @changesetWebform={{@changesetWebform}}\n      {{attrs-from-config \"buttonIcon,clearFormButtonIcon\" @changesetWebform}}\n    />\n  {{/if}}\n  {{@formSettings.clearFormButtonText}}</button>");

const ClearFormButtonComponent = templateOnly();
var clearFormButton = setComponentTemplate(TEMPLATE, ClearFormButtonComponent);

export { clearFormButton as default };
//# sourceMappingURL=clear-form-button.js.map
