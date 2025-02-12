import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#unless this.noLabel}}\n  <EmberChangesetWebforms::FieldElements::FieldLabelWrapper\n    id={{@labelId}}\n    class=\"{{ember-changeset-webforms/dynamic-class-names\n        \'legendElement,fieldLabel\'\n        @changesetWebform\n        @formField\n        @formField.validationStatus\n      }}\"\n    data-test-class=\"cwf-field-label\"\n    data-test-id=\"{{@formField.id}}-label\"\n    @formField={{@formField}}\n  >\n    {{#if @formField.labelComponent}}\n      <@formField.labelComponent.componentClass\n        @props={{@formField.labelComponent.componentClass}}\n        @changesetWebform={{@changesetWebform}}\n        @formField={{@formField}}\n      />\n    {{else if @formField.labelMarkdown}}\n      <Background::MarkdownToHtml @source={{@formField.labelMarkdown}} />\n    {{else if @formField.fieldLabel}}\n      {{@formField.fieldLabel}}\n\n    {{/if}}\n  </EmberChangesetWebforms::FieldElements::FieldLabelWrapper>\n{{/unless}}");

class FieldLabel extends Component {
  get noLabel() {
    const formField = this.args.formField;
    if (formField.hideLabel) {
      return true;
    }
    if (!formField.fieldLabel && !formField.labelComponent &&
    // !formField.fieldLegend &&
    // !formField.legendComponent &&
    !formField.labelMarkdown) {
      return true;
    }
    return null;
  }
  get includeForAtttribute() {
    const nonFormElementFieldTypes = ['staticContent'];
    return !nonFormElementFieldTypes.includes(this.args.formField.fieldType);
  }
}
setComponentTemplate(TEMPLATE, FieldLabel);

export { FieldLabel as default };
//# sourceMappingURL=field-label.js.map
