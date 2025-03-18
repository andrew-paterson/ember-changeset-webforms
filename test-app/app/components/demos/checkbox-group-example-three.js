import Component from '@glimmer/component';
import ComponentForAllCheckboxOptions from '../forms/component-for-all-checkbox-options';
import ComponentForSingleCheckboxOption from '../forms/component-for-single-checkbox-option';
import { ensureSafeComponent } from '@embroider/util';

export default class CheckboxGroupExampleTwoComponent extends Component {
  // BEGIN-SNIPPET checkbox-group-example-3.js
  formSchema = {
    formSettings: {
      formName: 'checkboxGroupExample3',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'checkboxes3',
        fieldType: 'checkboxGroup',
        fieldLabel: 'Custom label components',
        options: [
          {
            key: 'Option 1',
            optionLabelMarkdown: '**Option 1**',
          },
          {
            key: 'Option 2',
            optionLabelMarkdown: '_Option 2_',
          },
        ],
      },
    ],
  };
  // END-SNIPPET
}
