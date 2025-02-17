import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import removeObject from '../../../utils/remove-object.js';
import 'ember-power-select/styles';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<PowerSelect\n  @searchField={{@formField.optionDisplayProp}}\n  @allowClear={{false}}\n  @searchEnabled={{true}}\n  @closeOnSelect={{false}}\n  @searchPlaceholder={{@formField.searchPlaceholder}}\n  @options={{this.orderedOptions}}\n  @selected={{@formField.fieldValue}}\n  @placeholder={{@formField.placeholder}}\n  @onChange={{this.optionClicked}}\n  @onKeydown={{this.onkeydown}}\n  @onClose={{this.onclose}}\n  @onOpen={{this.onOpen}}\n  @extra={{hash fieldValue=@formField.fieldValue}}\n  @triggerComponent={{@formField.triggerComponent}}\n  @triggerId={{@fieldId}}\n  as |option|\n>\n  <Background::PowerSelectOptionCheckbox\n    @option={{option}}\n    @options={{@formField.options}}\n    @selected={{@formField.fieldValue}}\n    @optionDisplayProp={{@formField.optionDisplayProp}}\n    @fieldId={{@formField.fieldId}}\n    @changesetWebform={{@changesetWebform}}\n    @optionName={{if\n      @formField.optionDisplayProp\n      (get option @formField.optionDisplayProp)\n      option\n    }}\n  />\n</PowerSelect>");

class PowerSelectCheckboxesComponent extends Component {
  static {
    g(this.prototype, "orderedOptions", [tracked]);
  }
  #orderedOptions = (i(this, "orderedOptions"), undefined);
  optionSelected(option) {
    return (this.args.formField.fieldValue || []).includes(option);
  }
  optionClicked(option) {
    const formField = this.args.formField;
    var currentlySelectedOptions = formField.fieldValue ? [...formField.fieldValue] // To avoid mutating the original array
    : [];
    if (currentlySelectedOptions.indexOf(option) > -1) {
      removeObject(currentlySelectedOptions, option);
    } else {
      currentlySelectedOptions.push(option);
    }
    this.args.onUserInteraction('optionClicked');
    this.args.updateFieldValue(currentlySelectedOptions);
  }
  static {
    n(this.prototype, "optionClicked", [action]);
  }
  onOpen() {
    this.orderedOptions = (this.args.formField.options || []).filter(option => this.optionSelected(option)).concat((this.args.formField.options || []).filter(option => !this.optionSelected(option)));
  }
  static {
    n(this.prototype, "onOpen", [action]);
  }
  onkeydown(dropdown, e) {
    // TODO what does this actually do?
    if (e.keyCode === 13) ;
  }
  static {
    n(this.prototype, "onkeydown", [action]);
  }
}
setComponentTemplate(TEMPLATE, PowerSelectCheckboxesComponent);

export { PowerSelectCheckboxesComponent as default };
//# sourceMappingURL=power-select-checkboxes.js.map
