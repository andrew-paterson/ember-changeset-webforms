// BEGIN-SNIPPET custom-clicker-component.js
// forms/custom-clicker-component
import Component from '@glimmer/component';
import IconArrowUp from '../svg/icons/icon-arrow-up';
import IconArrowDown from '../svg/icons/icon-arrow-down';

export default class CustomClickerComponent extends Component {
  get icon() {
    return this.args.formField.customProps.showAdvanced
      ? IconArrowUp
      : IconArrowDown;
  }
}
// END-SNIPPET
