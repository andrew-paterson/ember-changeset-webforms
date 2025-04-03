import Component from '@glimmer/component';
import ComponentForAllCheckboxOptions from '../forms/component-for-all-checkbox-options';
import ComponentForSingleCheckboxOption from '../forms/component-for-single-checkbox-option';

export default class CheckboxGroupExampleTwoComponent extends Component {
  // BEGIN-SNIPPET checkbox-group-example-2.js
  formSchema = {
    formSettings: {
      formName: 'checkboxGroupExample2',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'checkboxes2',
        fieldType: 'checkboxGroup',
        fieldLabel: 'Custom label components',
        optionLabelComponent: {
          componentClass: ComponentForAllCheckboxOptions,
          props: {
            infoLink: 'https://example.com',
          },
        },
        options: [
          {
            label: 'Option 1',
            key: '1',
          },
          {
            label: 'Option 2',
            key: '2',
          },
          {
            label: 'Option 3',
            key: '3',
            optionLabelComponent: {
              componentClass: ComponentForSingleCheckboxOption,
              props: {
                info: 'This text was passed to the label component dynamically for this option, via the optionLabelComponent.props object.',
              },
            },
          },
        ],
      },
    ],
  };
  // END-SNIPPET
}
