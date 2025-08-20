import Component from '@glimmer/component';

export default class ValidationBasicsComponent extends Component {
  // BEGIN-SNIPPET validation-basics.js"
  formSchema = {
    formSettings: {
      formName: 'validationBasics',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: {
              presence: true,
            },
          },
          {
            validationMethod: 'validateLength',
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
        validatesOn: ['$inherited', 'insertWithValue'],
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: {
              presence: true,
            },
            validationMethod: 'validateFormat',
            arguments: {
              type: 'email',
            },
          },
        ],
      },
    ],
  };
  // END-SNIPPET
}
