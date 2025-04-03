import Component from '@glimmer/component';

// TODO document that classnames does nothing on a clone-group field (Also, is this a bug?)
export default class FieldSpecificClassSettingsComponent extends Component {
  // BEGIN-SNIPPET field-specific-class-settings.js"
  formSchema = {
    formSettings: {
      formName: 'fieldClassNames',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
        classNames: {
          fieldLabel: ['$inherited', 'class-for-the-field-label-of-this-field'],
        },
      },
      {
        fieldId: 'radioButtons1',
        fieldType: 'radioButtonGroup',
        fieldLabel: 'Basic usage',
        classNames: {
          labelElement: ['class-for-all-label-els-in-this-field'],
          radioButtonLabel: [],
        },
        options: [
          {
            label: 'Option 1',
            value: '1',
          },
          {
            label: 'Option 2',
            value: '2',
          },
        ],
      },
    ],
  };
  // END-SNIPPET
}
