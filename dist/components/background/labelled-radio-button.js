import Component from '@glimmer/component';
import safeName from '../../utils/safe-name.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  class=\"{{ember-changeset-webforms/dynamic-class-names\n      \'labelledRadioButton\'\n      @changesetWebform\n      @formField\n      @formField.validationStatus\n    }}\n    {{if @disabled \'disabled\'}}\"\n  data-test-id={{this.radioId}}\n  data-test-option=\"radio-option-{{@option.value}}\"\n  data-test-labelled-radio-button\n>\n  <RadioButton\n    @value={{@value}}\n    @groupValue={{@groupValue}}\n    @name={{@name}}\n    @changed={{@changedAction}}\n    @radioId={{this.radioId}}\n    @disabled={{@disabled}}\n    @ariaLabelledby={{this.labelId}}\n    @radioClass=\"{{ember-changeset-webforms/dynamic-class-names\n      \'radioButtonElement\'\n      @changesetWebform\n      @formField\n      @formField.validationStatus\n    }}\"\n  />\n  <Background::OptionLabelComponent\n    @optionLabelComponent={{@optionLabelComponent}}\n    @option={{@option}}\n    @optionMarkdownLabel={{@optionMarkdownLabel}}\n    @label={{@label}}\n    @for={{this.radioId}}\n    @labelId={{this.labelId}}\n    @checked={{this.checked}}\n    @changesetWebform={{@changesetWebform}}\n    @formField={{@formField}}\n    class={{ember-changeset-webforms/dynamic-class-names\n      \"radioButtonLabel\"\n      @changesetWebform\n      @formField\n      @formField.validationStatus\n    }}\n  />\n</div>");

class LabelledRadioButton extends Component {
  get radioId() {
    if (this.args.formField.fieldId === this.args.option.value) {
      return safeName(this.args.formField.id);
    }
    return safeName(`${this.args.formField.id}-radio-option-${this.args.option.value}`);
  }
  get labelId() {
    return this.radioId ? `${this.radioId}-label` : null;
  }
  get checked() {
    return this.args.groupValue === this.args.value;
  }
}
setComponentTemplate(TEMPLATE, LabelledRadioButton);

export { LabelledRadioButton as default };
//# sourceMappingURL=labelled-radio-button.js.map
