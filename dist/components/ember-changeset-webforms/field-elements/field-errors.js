import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if (and (eq @formField.validationStatus \"invalid\") @validationErrorsArray)}}\n  <div\n    id=\"{{@formField.id}}-errors\"\n    role=\"alert\"\n    {{attrs-from-config \"validationErrors\" @changesetWebform @formField}}\n    data-test-class=\"cwf-field-errors\"\n  >\n    {{#each @validationErrorsArray as |error|}}\n      <div\n        {{attrs-from-config \"validationError\" @changesetWebform @formField}}\n        data-test-class=\"cwf-field-error\"\n      >{{error}}</div>\n    {{/each}}\n  </div>\n{{/if}}");

const FieldErrors = templateOnly();
var fieldErrors = setComponentTemplate(TEMPLATE, FieldErrors);

export { fieldErrors as default };
//# sourceMappingURL=field-errors.js.map
