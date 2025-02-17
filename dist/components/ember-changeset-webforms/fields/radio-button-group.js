import { action } from '@ember/object';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  class=\"{{ember-changeset-webforms/dynamic-class-names\n      \'optionsWrapper\'\n      @changesetWebform\n      @formField\n      @formField.validationStatus\n    }}\"\n  ...attributes\n>\n  {{#each @formField.options as |option|}}\n    <Background::LabelledRadioButton\n      @value={{option.value}}\n      @groupValue={{@formField.fieldValue}}\n      @required={{false}}\n      @name={{or @formField.name @formField.id}}\n      @disabled={{if @formField.disabled true option.disabled}}\n      @label={{option.label}}\n      @optionLabelComponent={{or\n        option.optionLabelComponent\n        @formField.optionLabelComponent\n      }}\n      @optionMarkdownLabel={{option.optionMarkdownLabel}}\n      @containerName={{@formSettings.formName}}\n      @changedAction={{this.onRadioChange}}\n      @option={{option}}\n      @changesetWebform={{@changesetWebform}}\n      @formField={{@formField}}\n    />\n  {{/each}}\n</div>");

class RadioButtonGroup extends Component {
  onRadioChange(value) {
    this.args.onUserInteraction('radioOptionChanged', value);
    this.args.updateFieldValue(value);
  }
  static {
    n(this.prototype, "onRadioChange", [action]);
  }
}
setComponentTemplate(TEMPLATE, RadioButtonGroup);

export { RadioButtonGroup as default };
//# sourceMappingURL=radio-button-group.js.map
