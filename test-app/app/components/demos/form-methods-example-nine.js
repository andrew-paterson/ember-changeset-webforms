import Component from '@glimmer/component';

export default class FormMethodsExample1Component extends Component {
  // BEGIN-SNIPPET form-methods-example-9.js"
  formSchema = {
    formSettings: {
      formName: 'formMethods9',
      resetFormButton: true,
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
        defaultValue: 'Steve Holt',
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: {
              presence: true,
            },
          },
        ],
      },
      {
        fieldId: 'email',
        fieldType: 'input',
        inputType: 'email',
        fieldLabel: 'Email',
        defaultValue: 'steveholt@bluthcompany.com',
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: {
              presence: true,
            },
          },
          {
            validationMethod: 'validateFormat',
            arguments: { type: 'email' },
          },
        ],
      },
    ],
  };

  // END-SNIPPET
}
