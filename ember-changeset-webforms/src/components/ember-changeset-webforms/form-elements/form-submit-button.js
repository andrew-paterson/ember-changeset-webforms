import Component from '@glimmer/component';
import dynamicClassNames from '../../../utils/dynamic-class-names.js';

export default class FormSubmitButton extends Component {
  customType = 'button'; // TODO make configurable

  get requestInFlightClassNames() {
    return dynamicClassNames('submitButton', this.args.changesetWebform);
  }
}
