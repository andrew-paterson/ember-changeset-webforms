import Component from '@glimmer/component';

export default class SingleCheckboxExampleOneComponent extends Component {
  // BEGIN-SNIPPET single-checkbox-example-1.js
  formSchema = {
    formSettings: {
      formName: 'singleCheckboxExample1',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'acceptTerms',
        fieldType: 'singleCheckbox',
        fieldLabel: 'I agree to the terms and conditions',
        checkBoxLabel: 'I agree to the terms and conditions',
      },
    ],
  };
  // END-SNIPPET
}
