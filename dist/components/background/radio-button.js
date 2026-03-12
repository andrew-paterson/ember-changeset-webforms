import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isEqual } from '@ember/utils';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<Background::RadioButtonInput\n  id={{@radioId}}\n  autofocus={{@autofocus}}\n  disabled={{@disabled}}\n  name={{@name}}\n  required={{@required}}\n  tabindex={{@tabindex}}\n  @groupValue={{@groupValue}}\n  @checked={{this.checked}}\n  @value={{@value}}\n  aria-labelledby={{@ariaLabelledby}}\n  aria-describedby={{@ariaDescribedby}}\n  @changed={{this.changed}}\n  @required={{@required}}\n  ...attributes\n/>");

// From https://github.com/yapplabs/ember-radio-button/blob/master/addon/components/radio-button.js

class RadioButtonComponent extends Component {
  // value - passed in, required, the value for this radio button
  // groupValue - passed in, required, the currently selected value

  // optionally passed in:
  // disabled - boolean
  // required - boolean
  // name - string
  // radioClass - string
  // radioId - string
  // ariaLabelledby - string
  // ariaDescribedby - string

  get joinedClassNames() {
    const classNames = this.args.classNames;
    if (classNames && classNames.length && classNames.join) {
      return classNames.join(' ');
    }
    return classNames;
  }
  get checkedClass() {
    return this.args.checkedClass || 'checked';
  }
  get checked() {
    return isEqual(this.args.groupValue, this.args.value);
  }
  changed(newValue) {
    let changedAction = this.args.changed;

    // providing a closure action is optional
    if (changedAction) {
      changedAction(newValue);
    }
  }
  static {
    n(this.prototype, "changed", [action]);
  }
}
setComponentTemplate(TEMPLATE, RadioButtonComponent);

export { RadioButtonComponent as default };
//# sourceMappingURL=radio-button.js.map
