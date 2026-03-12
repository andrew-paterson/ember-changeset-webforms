import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FormMethodsExample1Component extends Component {
  // BEGIN-SNIPPET form-methods-example-6.js"
  formSchema = {
    formSettings: {
      formName: 'formMethods6',
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
        defaultValue: 'taken@example.com',
        validationEvents: ['$inherited', 'insertWithValue'],
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

  @action
  submitData(data, changesetWebform) {
    if (data.email === 'taken@example.com') {
      changesetWebform.pushErrors({
        fieldId: 'email',
        errors: [
          'This email address is already taken. Please use another one.',
        ],
      });
    }
  }

  // END-SNIPPET
}
