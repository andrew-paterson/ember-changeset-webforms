import Component from '@glimmer/component';

export default class AppWideFieldSettingsOverridden extends Component {
  // BEGIN-SNIPPET app-wide-class-settings.js"
  formSchema = {
    formSettings: {
      formName: 'appClassNames',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
      },
      {
        fieldId: 'checkboxGroup1',
        fieldType: 'checkboxGroup',
        fieldLabel: 'Basic usage',
        options: [
          {
            label: 'Option 1',
            key: '1',
          },
          {
            label: 'Option 2',
            key: '2',
          },
        ],
      },
    ],
  };
  // END-SNIPPET
}
