import { action } from '@ember/object';
import Component from '@glimmer/component';
import { typeOf } from '@ember/utils';
import PowerSelectComponent from 'ember-power-select/components/power-select';
import PowerSelectMultipleComponent from 'ember-power-select/components/power-select-multiple';
import { ensureSafeComponent } from '@embroider/util';
import 'ember-power-select/styles';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<this.componentClass\n  @triggerClass={{concat\n    \"validation-area \"\n    (ember-changeset-webforms/dynamic-class-names\n      \"powerSelectTrigger\" @changesetWebform @formField\n    )\n  }}\n  @options={{@formField.options}}\n  @selected={{@formField.fieldValue}}\n  @searchPlaceholder={{or @formField.searchPlaceholder \"Search\"}}\n  @searchField={{@formField.optionDisplayProp}}\n  @allowClear={{@formField.allowClear}}\n  @searchEnabled={{@formField.searchEnabled}}\n  @placeholder={{@formField.placeholder}}\n  @onChange={{fn this.onChange @formField}}\n  @onKeydown={{fn this.onKeydown @formField}}\n  @onclose={{@onclose}}\n  @triggerId={{@formField.id}}\n  @ariaLabelledBy={{@ariaLabelledBy}}\n  @disabled={{@formField.disabled}}\n  @matcher={{@formField.matcher}}\n  @closeOnSelect={{@formField.closeOnSelect}}\n  @selectedItemComponent={{@formField.selectedItemComponent}}\n  as |option|\n>\n  {{#if @formField.optionComponent}}\n    <@formField.optionComponent.componentClass\n      @props={{@formField.optionComponent.props}}\n      @changesetWebform={{@changesetWebform}}\n      @formField={{@formField}}\n      @option={{option}}\n    />\n  {{else}}\n    <Background::PowerSelectOption\n      @option={{option}}\n      @optionDisplayProp={{@formField.optionDisplayProp}}\n      @fieldId={{@formField.fieldId}}\n      @optionName={{if\n        @formField.optionDisplayProp\n        (get option @formField.optionDisplayProp)\n        option\n      }}\n    />\n  {{/if}}\n</this.componentClass>");

class PowerSelect extends Component {
  get componentClass() {
    return this.args.formField.multipleSelection ? ensureSafeComponent(PowerSelectMultipleComponent) : ensureSafeComponent(PowerSelectComponent);
  }
  onChange(formField, value, _selectComponent, event) {
    if ((value || []).length === 0) {
      value = null;
    }
    this.args.updateFieldValue(value);
    this.args.onUserInteraction(value, 'optionSelected', event);
  }
  static {
    n(this.prototype, "onChange", [action]);
  }
  onKeydown(formField, dropdown, event) {
    const primitiveOptions = dropdown.options.map(option => {
      if (typeOf(option) === 'object' && this.args.formField.optionDisplayProp) {
        return option[this.args.formField.optionDisplayProp];
      } else {
        return option;
      }
    });
    if (event.keyCode === 13) {
      event.preventDefault();
      if (formField.multipleSelection && formField.allowFreeTyping && !primitiveOptions.find(primitiveOption => primitiveOption.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1)) {
        let value = this.fieldValue || [];
        var newItem;
        if (this.args.formField.optionDisplayProp) {
          newItem = {};
          newItem[this.args.formField.optionDisplayProp] = event.target.value;
        } else {
          newItem = event.target.value;
        }
        value.push(newItem);
        this.args.onUserInteraction('keyDownEnterPowerSelectMultiple', newItem, event);
        this.args.updateFieldValue(value, 'keyDownPowerSelect', event);
      }
      this.args.onUserInteraction('keyDownPowerSelect', newItem, event);
    }
  }
  static {
    n(this.prototype, "onKeydown", [action]);
  }
}
setComponentTemplate(TEMPLATE, PowerSelect);

export { PowerSelect as default };
//# sourceMappingURL=power-select.js.map
