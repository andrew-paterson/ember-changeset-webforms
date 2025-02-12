import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! TOIDO doc and test this, with aria attrs }}\n\n{{#if @formField.fieldDescription}}\n  <div\n    id=\"{{@formField.id}}-description\"\n    class=\"field-description\"\n    ...attributes\n  >\n    {{@formField.fieldDescription}}\n  </div>\n{{/if}}");

const FieldDescription = templateOnly();
var fieldDescription = setComponentTemplate(TEMPLATE, FieldDescription);

export { fieldDescription as default };
//# sourceMappingURL=field-description.js.map
