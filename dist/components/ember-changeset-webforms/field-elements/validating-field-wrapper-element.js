import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if @formField.isFieldset}}\n  <fieldset\n    ...attributes\n    data-options-length={{@formField.options.length}}\n    aria-errormessage={{@formField.ariaErrorMessage}}\n    aria-describedby={{@formField.ariaDescribedBy}}\n  >\n    {{yield}}\n  </fieldset>\n{{else}}\n  <div ...attributes>\n    {{yield}}\n  </div>\n{{/if}}");

class EmberChangesetWebformsFieldElementsValidatingFieldWrapperElementComponent extends Component {}
setComponentTemplate(TEMPLATE, EmberChangesetWebformsFieldElementsValidatingFieldWrapperElementComponent);

export { EmberChangesetWebformsFieldElementsValidatingFieldWrapperElementComponent as default };
//# sourceMappingURL=validating-field-wrapper-element.js.map
