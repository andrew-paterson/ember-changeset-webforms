import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class CheckboxGroup extends Component {
  @tracked value;

  get options() {
    var checkedItems = this.stringToArray(this.args.displayValue);
    var options = this.args.formField.options;
    options.forEach(function (option) {
      if (checkedItems.indexOf(option.key) > -1) {
        option.value = true;
      } else {
        option.value = false;
      }
    });
    options.forEach((option) => (option.onlyCheckedOption = false));
    checkedItems = checkedItems || [];
    if (checkedItems.length === 1) {
      const checkedOption = options.findBy('key', checkedItems[0]);
      checkedOption.onlyCheckedOption = true;
    }
    return options;
  }

  @action
  checkboxToggled(formField, key, value, event) {
    var checkedItems = this.stringToArray(this.args.displayValue);
    if (value === true) {
      checkedItems = checkedItems.concat([key]); // TODO can pushObject work with tracked props?
    } else {
      checkedItems = checkedItems.filter((item) => {
        return item != key;
      });
    }
    if (checkedItems.length === 0) {
      checkedItems = null;
    } else {
      checkedItems = checkedItems.sort();
    }
    this.args.updateFieldValue(checkedItems);
    this.args.onUserInteraction('checkboxToggled', checkedItems, event);
  }

  stringToArray(value) {
    var array;
    if (typeof value === 'string') {
      array = value.split(',');
    } else {
      array = value || [];
    }
    array = array.map((item) => {
      return item.trim();
    });
    return array;
  }
}
