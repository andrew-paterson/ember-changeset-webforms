import Component from '@glimmer/component';

export default class ValidationEventsComponent extends Component {
  constructor() {
    super(...arguments);
    if (this.args.updateFormSchema) {
      this.args.updateFormSchema(this.formSchema);
    }
  }
  // BEGIN-SNIPPET validation-events.js"
  formSchema = {
    formSettings: {
      formName: 'validationEvents',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
        placeholder: 'Name (default validation events)',
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
        placeholder: 'Email (Custom validation events, without $inherited)',
        validatesOn: ['keyUp'],
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: {
              presence: true,
            },
          },
          {
            validationMethod: 'validateFormat',
            arguments: {
              type: 'email',
            },
          },
        ],
      },
      {
        fieldId: 'phoneNumber',
        fieldType: 'input',
        fieldLabel: 'Phone number',
        placeholder: 'Phone number (Custom validation events, with $inherited)',
        validatesOn: ['$inherited', 'keyUp'],
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
              min: 3,
              max: 15,
            },
          },
        ],
      },
    ],
  };
  // END-SNIPPET
}
