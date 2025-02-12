import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if @formField.contentComponent}}\n  <@formField.contentComponent.componentClass\n    @props={{@formField.contentComponent.props}}\n    @formField={{@formField}}\n    @changesetWebform={{@changesetWebform}}\n  />\n{{else}}\n  {{this.textElement}}\n{{/if}}");

class StaticContent extends Component {
  get textElement() {
    return htmlSafe(`<${this.args.formField.textElement} class="${this.args.formField.textElementClass}">${this.args.formField.text}</${this.args.formField.textElement}>`);
  }
}
setComponentTemplate(TEMPLATE, StaticContent);

export { StaticContent as default };
//# sourceMappingURL=static-content.js.map
