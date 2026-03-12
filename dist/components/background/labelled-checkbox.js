import { action } from '@ember/object';
import Component from '@glimmer/component';
import { safeName } from 'validated-changeset-webforms';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  {{attrs-from-config\n    \"labelledCheckbox,optionWrapper\"\n    @changesetWebform\n    @formField\n  }}\n  class=\"{{if @disabled \'disabled\'}}\"\n  data-test-id={{this.checkboxId}}\n  data-test-option=\"checkbox-option-{{@option.key}}\"\n  data-test-labelled-checkbox\n  ...attributes\n>\n  <input\n    type=\"checkbox\"\n    checked={{readonly @value}}\n    {{on \"click\" this.checkboxClicked}}\n    disabled={{@disabled}}\n    id={{this.checkboxId}}\n    data-set-custom-validity\n    aria-errormessage={{@ariaErrorMessage}}\n    aria-describedby={{@ariaDescribedBy}}\n    name={{@name}}\n    {{attrs-from-config \"checkboxElement\" @changesetWebform @formField}}\n    required={{@required}}\n  />\n  <Background::OptionLabelComponent\n    @optionLabelComponent={{@optionLabelComponent}}\n    @option={{@option}}\n    @optionLabelMarkdown={{@optionLabelMarkdown}}\n    @label={{@label}}\n    @for={{this.checkboxId}}\n    @labelId={{this.labelId}}\n    @checked={{@value}}\n    @changesetWebform={{@changesetWebform}}\n    @formField={{@formField}}\n    data-test-class={{@optionLabelDataTestClass}}\n    {{attrs-from-config \"checkboxLabel\" @changesetWebform @formField}}\n  />\n</div>");

class LabelledCheckbox extends Component {
  get checkboxId() {
    if (this.args.checkboxId) {
      return this.args.checkboxId;
    }
    if (this.args.formField.fieldId === this.args.option.key) {
      return `${safeName(this.args.formField.id)}-checkbox`;
    }
    return safeName(`${this.args.formField.id}-checkbox-option-${this.args.option.key}`);
  }
  get labelId() {
    return this.checkboxId ? `${this.checkboxId}-label` : null;
  }
  checkboxClicked(event) {
    if (this.args.changedAction) {
      this.args.changedAction(event.target.checked, event);
    }
  }
  static {
    n(this.prototype, "checkboxClicked", [action]);
  }
}
setComponentTemplate(TEMPLATE, LabelledCheckbox);

export { LabelledCheckbox as default };
//# sourceMappingURL=labelled-checkbox.js.map
