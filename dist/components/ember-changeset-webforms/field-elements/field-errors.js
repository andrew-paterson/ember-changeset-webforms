import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if (and (eq @formField.validationStatus \"invalid\") @validationErrorsArray)}}\n  <div\n    id=\"{{@formField.id}}-errors\"\n    class=\"{{ember-changeset-webforms/dynamic-class-names\n        \'validationErrors\'\n        @changesetWebform\n        @formField\n        @formField.validationStatus\n      }}\"\n    data-test-class=\"cwf-field-errors\"\n  >\n    {{#each @validationErrorsArray as |error|}}\n      <div\n        class=\"ember-changeset-webforms-field-error\"\n        data-test-class=\"cwf-field-error\"\n      >{{error}}</div>\n    {{/each}}\n  </div>\n{{/if}}");

const FieldErrors = templateOnly();
var fieldErrors = setComponentTemplate(TEMPLATE, FieldErrors);

export { fieldErrors as default };
//# sourceMappingURL=field-errors.js.map
