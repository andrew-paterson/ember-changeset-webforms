// BEGIN-SNIPPET custom-clicker-component.js
// forms/custom-clicker-component
import Component from '@glimmer/component';
import IconArrowUp from '../svg/icons/icon-arrow-up';
import IconArrowDown from '../svg/icons/icon-arrow-down';
import { ensureSafeComponent } from '@embroider/util';

export default class CustomClickerComponent extends Component {
  get icon() {
    return this.args.formField.customProps.showAdvanced
      ? ensureSafeComponent(IconArrowUp)
      : ensureSafeComponent(IconArrowDown);
  }
}
// END-SNIPPET
