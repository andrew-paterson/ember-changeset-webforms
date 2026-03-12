import { action } from '@ember/object';
import Component from '@glimmer/component';
import { removeObject } from 'validated-changeset-webforms';
import 'ember-power-select/styles';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<PowerSelect\n  @searchField={{@formField.optionDisplayProp}}\n  @allowClear={{false}}\n  @searchEnabled={{true}}\n  @closeOnSelect={{false}}\n  @searchPlaceholder={{@formField.searchPlaceholder}}\n  @options={{@formField.options}}\n  @selected={{@formField.fieldValue}}\n  @placeholder={{@formField.placeholder}}\n  @onChange={{this.optionToggled}}\n  @onKeydown={{this.onkeydown}}\n  @onClose={{this.onclose}}\n  @onOpen={{this.onOpen}}\n  @extra={{hash fieldValue=@formField.fieldValue}}\n  @triggerComponent={{@formField.triggerComponent}}\n  @triggerId={{@fieldId}}\n  @ariaDescribedBy={{@formField.ariaDescribedBy}}\n  @ariaInvalid={{@formField.ariaInvalid}}\n  @ariaLabel={{@formField.ariaLabel}}\n  @ariaLabelledBy={{@formField.ariaLabelledBy}}\n  @required={{@formField.required}}\n  aria-errormessage={{@formField.ariaErrorMessage}}\n  @loadingMessage={{@formField.loadingMessage}}\n  {{attrs-from-config\n    \"powerSelectCheckboxesTrigger\"\n    @changesetWebform\n    @formField\n  }}\n  as |option|\n>\n  <Background::PowerSelectOptionCheckbox\n    @option={{option}}\n    @options={{@formField.options}}\n    @selected={{@formField.fieldValue}}\n    @optionDisplayProp={{@formField.optionDisplayProp}}\n    @fieldId={{@formField.fieldId}}\n    @changesetWebform={{@changesetWebform}}\n    @optionName={{if\n      @formField.optionDisplayProp\n      (get option @formField.optionDisplayProp)\n      option\n    }}\n  />\n</PowerSelect>");

class PowerSelectCheckboxesComponent extends Component {
  optionSelected(option) {
    return (this.args.formField.fieldValue || []).includes(option);
  }
  optionToggled(option) {
    const formField = this.args.formField;
    var currentlySelectedOptions = formField.fieldValue ? [...formField.fieldValue] // To avoid mutating the original array
    : [];
    if (currentlySelectedOptions.indexOf(option) > -1) {
      removeObject(currentlySelectedOptions, option);
    } else {
      currentlySelectedOptions.push(option);
    }
    this.args.onUserInteraction('optionToggled');
    this.args.updateFieldValue(currentlySelectedOptions);
  }
  static {
    n(this.prototype, "optionToggled", [action]);
  }
  onOpen(dropdown) {
    if (this.args.formField.displaySelectedFirst) {
      const listId = `#ember-power-select-options-${dropdown.uniqueId}`;
      setTimeout(() => {
        const optionsElement = document.querySelector(listId);
        optionsElement.style.display = 'flex';
        optionsElement.style.flexDirection = 'column';
        const listElements = optionsElement.querySelectorAll(`.ember-power-select-option`);
        Array.from(listElements).forEach(listElement => {
          if (listElement.getAttribute('aria-selected') === 'true') {
            listElement.style.order = -1;
          } else {
            listElement.style.removeProperty('order');
          }
        });
      });
    }
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
