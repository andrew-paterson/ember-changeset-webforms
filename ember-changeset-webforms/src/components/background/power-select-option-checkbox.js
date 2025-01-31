import Component from '@glimmer/component';
import { action } from '@ember/object';
import safeName from '../../utils/safe-name';
import './power-select-option-checkbox.css';

export default class PowerSelectOptionCheckbox extends Component {
  get isSelected() {
    return (this.args.selected || []).includes(this.args.option);
  }

  get checkboxId() {
    return safeName(
      `power-select-checkbox-option-${this.args.optionName}-checkbox`,
    );
  }

  get labelId() {
    return this.checkboxId ? `${this.checkboxId}-label` : null;
  }

  @action
  selectionChanged() {
    setTimeout(() => {
      this.el.querySelector('input').checked = this.isSelected;
    });
  }

  @action
  didInsert(el) {
    this.el = el;
    setTimeout(() => {
      this.el.querySelector('input').checked = this.isSelected;
    });
  }
}
