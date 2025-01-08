import Component from '@glimmer/component';
import safeName from '../../utils/safe-name';

export default class LabelledRadioButton extends Component {
  get radioId() {
    if (this.args.formField.fieldId === this.args.option.value) {
      return safeName(this.args.formField.id);
    }
    return safeName(
      `${this.args.formField.id}-radio-option-${this.args.option.value}`,
    );
  }

  get labelId() {
    return this.radioId ? `${this.radioId}-label` : null;
  }

  get checked() {
    return this.args.groupValue === this.args.value;
  }
}
