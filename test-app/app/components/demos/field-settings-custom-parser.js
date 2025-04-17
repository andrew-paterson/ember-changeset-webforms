// BEGIN-SNIPPET field-settings-custom-parser.js
import Component from '@glimmer/component';

export default class DemosCustomFieldUsageComponent extends Component {
  formSchema = {
    formSettings: {
      formName: 'Emai',
    },
    fields: [
      {
        fieldId: 'email',
        fieldType: 'input',
        inputType: 'email',
        fieldLabel: 'Enter your bluthcompany.com email address',
        defaultValue: 'steve',
      },
    ],
  };
}
// END-SNIPPET
