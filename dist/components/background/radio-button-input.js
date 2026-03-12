import Component from '@glimmer/component';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<input\n  ...attributes\n  type=\"radio\"\n  checked={{@checked}}\n  aria-checked={{this.checkedStr}}\n  value={{@value}}\n  required={{@required}}\n  {{on \"change\" this.change}}\n/>");

// Adapted from https://github.com/yapplabs/ember-radio-button/blob/master/addon/components/radio-button-input.js

class RadioButtonInputComponent extends Component {
  get checkedStr() {
    const checked = this.args.checked;
    if (typeof checked === 'boolean') {
      return checked.toString();
    }
    return null;
  }
  change() {
    if (this.args.groupValue !== this.args.value) {
      this.args.changed(this.args.value);
    }
  }
  static {
    n(this.prototype, "change", [action]);
  }
}
setComponentTemplate(TEMPLATE, RadioButtonInputComponent);

export { RadioButtonInputComponent as default };
//# sourceMappingURL=radio-button-input.js.map
