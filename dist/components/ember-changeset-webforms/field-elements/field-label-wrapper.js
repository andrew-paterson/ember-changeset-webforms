import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if (eq this.labelType \"legend\")}}\n  <legend\n    {{attrs-from-config \"legendElement\" @changesetWebform @formField}}\n    ...attributes\n  >\n    {{yield}}\n  </legend>\n{{else if (eq this.labelType \"div\")}}\n  <div\n    {{attrs-from-config \"divLabel\" @changesetWebform @formField}}\n    ...attributes\n  >\n    {{yield}}\n  </div>\n{{else}}\n  <label\n    {{attrs-from-config \"labelElement\" @changesetWebform @formField}}\n    for={{@formField.id}}\n    ...attributes\n  >\n    {{yield}}\n  </label>\n{{/if}}");

class FieldLabel extends Component {
  get labelType() {
    const formField = this.args.formField;
    if (formField.requiresAriaLabelledBy) {
      return 'div';
    }
    if (this.args.formField.isFieldset) {
      return 'legend';
    }
    return 'label';
  }
}
setComponentTemplate(TEMPLATE, FieldLabel);

export { FieldLabel as default };
//# sourceMappingURL=field-label-wrapper.js.map
