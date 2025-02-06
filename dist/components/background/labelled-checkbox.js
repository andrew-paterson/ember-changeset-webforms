import { action } from '@ember/object';
import Component from '@glimmer/component';
import safeName from '../../utils/safe-name.js';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  class=\"{{ember-changeset-webforms/dynamic-class-names\n      \'labelledCheckbox\'\n      @changesetWebform\n      @formField\n      @formField.validationStatus\n    }}\n    {{if @disabled \'disabled\'}}\"\n  data-test-id={{this.checkboxId}}\n  data-test-option=\"checkbox-option-{{@option.key}}\"\n  data-test-labelled-checkbox\n>\n  <input\n    type=\"checkbox\"\n    checked={{readonly @value}}\n    {{on \"click\" this.checkboxClicked}}\n    disabled={{@disabled}}\n    id={{this.checkboxId}}\n    aria-labelledby={{this.labelId}}\n    name={{@name}}\n    class=\"{{ember-changeset-webforms/dynamic-class-names\n        \'checkboxElement\'\n        @changesetWebform\n        @formField\n        @formField.validationStatus\n      }}\"\n  />\n  <Background::OptionLabelComponent\n    @optionLabelComponent={{@optionLabelComponent}}\n    @option={{@option}}\n    @optionMarkdownLabel={{@optionMarkdownLabel}}\n    @label={{@label}}\n    @for={{this.checkboxId}}\n    @labelId={{this.labelId}}\n    @checked={{@value}}\n    @changesetWebform={{@changesetWebform}}\n    @formField={{@formField}}\n    class={{ember-changeset-webforms/dynamic-class-names\n      \"checkboxLabel\"\n      @changesetWebform\n      @formField\n      @formField.validationStatus\n    }}\n  />\n</div>");

class LabelledCheckbox extends Component {
  get checkboxId() {
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
