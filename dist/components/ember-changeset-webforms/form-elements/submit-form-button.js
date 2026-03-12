import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<button\n  type={{@formSettings.submitButtonType}}\n  data-test-id=\"cwf-submit-form-button\"\n  disabled={{@formSettings.submitDisabled}}\n  {{on \"click\" (fn @onFormSubmit @changesetWebform)}}\n  {{attrs-from-config \"buttonElement,submitButton\" @changesetWebform}}\n  ...attributes\n>\n  {{#if @formSettings.submitButtonIcon}}\n    <@formSettings.submitButtonIcon.componentClass\n      @props={{@formSettings.submitButtonIcon.props}}\n      @changesetWebform={{@changesetWebform}}\n      {{attrs-from-config \"buttonIcon,submitButtonIcon\" @changesetWebform}}\n    />\n  {{/if}}\n  {{@formSettings.submitButtonText}}\n  {{#if @changesetWebform.formSettings.requestInFlight}}\n    {{#if @formSettings.requestInFlightIcon}}\n      <@formSettings.requestInFlightIcon.componentClass\n        @props={{@formSettings.requestInFlightIcon.props}}\n        @changesetWebform={{@changesetWebform}}\n        {{attrs-from-config \"requestInFlightIcon\" @changesetWebform}}\n      />\n    {{/if}}\n  {{/if}}\n</button>");

const SubmitButtonComponent = templateOnly();
var submitFormButton = setComponentTemplate(TEMPLATE, SubmitButtonComponent);

export { submitFormButton as default };
//# sourceMappingURL=submit-form-button.js.map
