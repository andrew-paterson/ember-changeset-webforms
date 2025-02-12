import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if @optionLabelComponent}}\n  <@optionLabelComponent.componentClass\n    @props={{@optionLabelComponent.props}}\n    @option={{@option}}\n    @for={{@for}}\n    @labelId={{@labelId}}\n    @checked={{@checked}}\n    @changesetWebform={{@changesetWebform}}\n    @formField={{@formField}}\n    ...attributes\n  />\n{{else if @optionMarkdownLabel}}\n  <label for={{@for}} id={{@labelId}} ...attributes>\n    <Background::MarkdownToHtml @source={{@optionMarkdownLabel}} />\n  </label>\n{{else if @label}}\n  <label for={{@for}} id={{@labelId}} ...attributes>{{@label}}</label>\n{{/if}}");

const OptionLabelComponent = templateOnly();
var optionLabelComponent = setComponentTemplate(TEMPLATE, OptionLabelComponent);

export { optionLabelComponent as default };
//# sourceMappingURL=option-label-component.js.map
