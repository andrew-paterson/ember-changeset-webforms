import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if (eq this.labelType \"legend\")}}\n  <legend ...attributes>\n    {{yield}}\n  </legend>\n{{else if (eq this.labelType \"div\")}}\n  <div ...attributes>\n    {{yield}}\n  </div>\n{{else}}\n  <label for={{@formField.id}} ...attributes>\n    {{yield}}\n  </label>\n{{/if}}");

class FieldLabel extends Component {
  get labelType() {
    const formField = this.args.formField;
    const nonFormElementFieldTypes = ['staticContent', 'powerSelect'];
    if (nonFormElementFieldTypes.includes(formField.fieldType)) {
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
