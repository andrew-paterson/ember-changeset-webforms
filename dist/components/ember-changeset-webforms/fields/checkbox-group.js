import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  class=\"{{ember-changeset-webforms/dynamic-class-names\n      \'optionsWrapper\'\n      @changesetWebform\n      @formField\n      @formField.validationStatus\n    }}\"\n  ...attributes\n>\n  {{#each this.options as |option|}}\n    <Background::LabelledCheckbox\n      @dataTestId={{concat\n        @dataTestFieldId\n        \"-checkbox-option-\"\n        (ember-changeset-webforms/safe-name option.key)\n      }}\n      @value={{readonly option.value}}\n      @label={{option.label}}\n      @optionLabelComponent={{or\n        option.optionLabelComponent\n        @formField.optionLabelComponent\n      }}\n      @optionMarkdownLabel={{option.optionMarkdownLabel}}\n      @containerName={{@formSettings.formName}}\n      @changedAction={{fn this.checkboxToggled option}}\n      @name={{@formField.name}}\n      @disabled={{or\n        option.disabled\n        @formField.disabled\n        (and @formField.preventEmpty option.onlyCheckedOption)\n      }}\n      @option={{option}}\n      @changesetWebform={{@changesetWebform}}\n      @formField={{@formField}}\n    />\n  {{/each}}\n</div>");

class CheckboxGroup extends Component {
  static {
    g(this.prototype, "value", [tracked]);
  }
  #value = (i(this, "value"), undefined);
  get options() {
    var checkedItems = this.stringToArray(this.args.formField.fieldValue);
    var options = this.args.formField.options;
    options.forEach(function (option) {
      if (checkedItems.indexOf(option.key) > -1) {
        option.value = true;
      } else {
        option.value = false;
      }
    });
    options.forEach(option => option.onlyCheckedOption = false);
    checkedItems = checkedItems || [];
    if (checkedItems.length === 1) {
      const checkedOption = options.findBy('key', checkedItems[0]);
      checkedOption.onlyCheckedOption = true;
    }
    return options;
  }
  checkboxToggled(option, value, event) {
    var checkedItems = this.stringToArray(this.args.formField.fieldValue);
    if (value === true) {
      checkedItems = checkedItems.concat([option.key]); // TODO can pushObject work with tracked props?
      option.checked = true;
    } else {
      checkedItems = checkedItems.filter(item => {
        return item != option.key;
      });
      option.checked = false;
    }
    if (checkedItems.length === 0) {
      checkedItems = null;
    } else {
      checkedItems = checkedItems.sort();
    }
    this.args.updateFieldValue(checkedItems);
    this.args.onUserInteraction('checkboxToggled', checkedItems, event);
  }
  static {
    n(this.prototype, "checkboxToggled", [action]);
  }
  stringToArray(value) {
    var array;
    if (typeof value === 'string') {
      array = value.split(',');
    } else {
      array = value || [];
    }
    array = array.map(item => {
      return item.trim();
    });
    return array;
  }
}
setComponentTemplate(TEMPLATE, CheckboxGroup);

export { CheckboxGroup as default };
//# sourceMappingURL=checkbox-group.js.map
