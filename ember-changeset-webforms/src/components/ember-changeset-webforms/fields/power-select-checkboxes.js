import { action } from '@ember/object';
import Component from '@glimmer/component';
import removeObject from 'validated-changeset-webforms/utils/remove-object.js';
import 'ember-power-select/styles';

export default class PowerSelectCheckboxesComponent extends Component {
  optionSelected(option) {
    return (this.args.formField.fieldValue || []).includes(option);
  }

  @action
  optionToggled(option) {
    const formField = this.args.formField;
    var currentlySelectedOptions = formField.fieldValue
      ? [...formField.fieldValue] // To avoid mutating the original array
      : [];
    if (currentlySelectedOptions.indexOf(option) > -1) {
      removeObject(currentlySelectedOptions, option);
    } else {
      currentlySelectedOptions.push(option);
    }
    this.args.onUserInteraction('optionToggled');
    this.args.updateFieldValue(currentlySelectedOptions);
  }

  @action
  onOpen(dropdown) {
    if (this.args.formField.displaySelectedFirst) {
      const listId = `#ember-power-select-options-${dropdown.uniqueId}`;
      setTimeout(() => {
        const optionsElement = document.querySelector(listId);
        optionsElement.style.display = 'flex';
        optionsElement.style.flexDirection = 'column';
        const listElements = optionsElement.querySelectorAll(
          `.ember-power-select-option`,
        );
        Array.from(listElements).forEach((listElement) => {
          if (listElement.getAttribute('aria-selected') === 'true') {
            listElement.style.order = -1;
          } else {
            listElement.style.removeProperty('order');
          }
        });
      });
    }
  }

  @action
  onkeydown(dropdown, e) {
    // TODO what does this actually do?
    if (e.keyCode === 13) {
      // this.args.onPressEnter(e.target.value);
    }
  }
}
