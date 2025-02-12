import { action } from '@ember/object';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<Background::LabelledCheckbox\n  @dataTestId={{concat @dataTestFieldId \"-checkbox-option-\" @option.value}}\n  @value={{readonly @formField.fieldValue}}\n  @label={{@formField.checkBoxLabel}}\n  @optionLabelComponent={{@formField.checkBoxLabelComponent}}\n  @optionMarkdownLabel={{@formField.checkboxLabelMarkdown}}\n  @changedAction={{fn this.checkboxToggled @formField}}\n  @changesetWebform={{@changesetWebform}}\n  @formField={{@formField}}\n  @name={{@formField.name}}\n  @containerName={{@formSettings.formName}}\n  @disabled={{@formField.disabled}}\n  @option={{hash key=@formField.fieldId}}\n/>");

class Checkbox extends Component {
  checkboxToggled(formField, value, event) {
    this.args.updateFieldValue(value);
    this.args.onUserInteraction('checkboxToggled', value, event);
  }
  static {
    n(this.prototype, "checkboxToggled", [action]);
  }
}
setComponentTemplate(TEMPLATE, Checkbox);

export { Checkbox as default };
//# sourceMappingURL=checkbox.js.map
