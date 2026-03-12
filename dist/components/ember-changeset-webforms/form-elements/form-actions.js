import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  data-test-id=\"cwf-form-actions\"\n  {{attrs-from-config \"formActions\" @changesetWebform}}\n>\n  {{#unless @formSettings.hideSubmitButton}}\n    <EmberChangesetWebforms::FormElements::SubmitFormButton\n      @onFormSubmit={{@onFormSubmit}}\n      @changesetWebform={{@changesetWebform}}\n      @formSettings={{@formSettings}}\n    />\n  {{/unless}}\n  {{#if @formSettings.resetFormButton}}\n    <EmberChangesetWebforms::FormElements::ResetFormButton\n      @resetForm={{@resetForm}}\n      @changesetWebform={{@changesetWebform}}\n      @formSettings={{@formSettings}}\n    />\n  {{/if}}\n  {{#if @formSettings.clearFormButton}}\n    <EmberChangesetWebforms::FormElements::ClearFormButton\n      @clearForm={{@clearForm}}\n      @changesetWebform={{@changesetWebform}}\n      @formSettings={{@formSettings}}\n    />\n  {{/if}}\n</div>");

const FormActionsComponent = templateOnly();
var formActions = setComponentTemplate(TEMPLATE, FormActionsComponent);

export { formActions as default };
//# sourceMappingURL=form-actions.js.map
