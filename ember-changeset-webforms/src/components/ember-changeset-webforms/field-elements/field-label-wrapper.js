import Component from '@glimmer/component';

export default class FieldLabel extends Component {
  get labelType() {
    const formField = this.args.formField;
    if (formField.requiresAriaLabelledBy) {
      return 'div';
    }
    if (this.args.formField.isFieldset) {
      return 'legend';
    }
    return 'label';
  }
}
