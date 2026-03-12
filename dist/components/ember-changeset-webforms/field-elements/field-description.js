import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if @formField.fieldDescription}}\n  <div\n    id=\"{{@formField.id}}-description\"\n    {{attrs-from-config \"fieldDescription\" @changesetWebform @formField}}\n    data-test-class=\"cwf-field-description\"\n    ...attributes\n  >\n    {{@formField.fieldDescription}}\n  </div>\n{{/if}}");

const FieldDescription = templateOnly();
var fieldDescription = setComponentTemplate(TEMPLATE, FieldDescription);

export { fieldDescription as default };
//# sourceMappingURL=field-description.js.map
