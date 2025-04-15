// Adapted from https://github.com/yapplabs/ember-radio-button/blob/master/addon/components/radio-button-input.js

import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class RadioButtonInputComponent extends Component {
  get checkedStr() {
    const checked = this.args.checked;

    if (typeof checked === 'boolean') {
      return checked.toString();
    }

    return null;
  }

  @action change() {
    if (this.args.groupValue !== this.args.value) {
      this.args.changed(this.args.value);
    }
  }
}
