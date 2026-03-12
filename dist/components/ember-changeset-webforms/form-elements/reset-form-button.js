import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<button\n  {{attrs-from-config \"buttonElement,resetFormButton\" @changesetWebform}}\n  type=\"button\"\n  data-test-id=\"cwf-discard-changes-button\"\n  {{on \"click\" (fn @resetForm @changesetWebform)}}\n>\n  {{#if @formSettings.resetFormButtonIcon}}\n    <@formSettings.resetFormButtonIcon.componentClass\n      @props={{@formSettings.resetFormButtonIcon.props}}\n      @changesetWebform={{@changesetWebform}}\n      {{attrs-from-config \"buttonIcon,resetFormButtonIcon\" @changesetWebform}}\n    />\n  {{/if}}\n  {{@formSettings.resetFormButtonText}}</button>");

const ResetFormButtonComponent = templateOnly();
var resetFormButton = setComponentTemplate(TEMPLATE, ResetFormButtonComponent);

export { resetFormButton as default };
//# sourceMappingURL=reset-form-button.js.map
