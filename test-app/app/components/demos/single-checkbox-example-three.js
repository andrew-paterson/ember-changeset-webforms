import Component from '@glimmer/component';
import ComponentForSingleCheckboxOption from '../forms/component-for-single-checkbox-option';

export default class SingleCheckboxExampleThreeComponent extends Component {
  // BEGIN-SNIPPET single-checkbox-example-3.js
  formSchema = {
    formSettings: {
      formName: 'singleCheckboxExample3',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldLabel: 'Terms and conditions',
        fieldId: 'acceptTerms',
        fieldType: 'singleCheckbox',
        checkBoxLabelComponent: {
          componentClass: ComponentForSingleCheckboxOption,
          props: {
            info: 'This text was passed to the label component dynamically for this option, via the checkBoxLabelComponent.props object.',
          },
        },
      },
    ],
  };
  // END-SNIPPET
}
