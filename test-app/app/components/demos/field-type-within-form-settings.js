import Component from '@glimmer/component';

// TODO documnet that classnames does nothing on a clone-group field (Also, is this a bug?)
export default class FieldSpecificClassSettingsComponent extends Component {
  // BEGIN-SNIPPET field-type-within-form-settings.js"
  formSchema = {
    formSettings: {
      formName: 'fieldTypeWithinFormClassnames',
      hideSubmitButton: true,
    },
    fieldSettings: {
      fieldTypes: [
        {
          fieldType: 'input',
          attrsFromConfig: {
            classNames: {
              labelElement: ['$inherited', 'form-wide-label-class'],
            },
          },
        },
        {
          fieldType: 'radioButtonGroup',
          attrsFromConfig: {
            classNames: {
              labelElement: ['form-wide-radio-button-label-el-class'],
              radioButtonLabel: [],
            },
          },
        },
      ],
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
      },
      {
        fieldId: 'radioButtons1',
        fieldType: 'radioButtonGroup',
        fieldLabel: 'Basic usage',
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
      {
        fieldId: 'radioButtons2',
        fieldType: 'radioButtonGroup',
        fieldLabel: 'A second field',
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
