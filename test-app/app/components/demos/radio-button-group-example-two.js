import Component from '@glimmer/component';
import ComponentForAllRadioOptions from '../forms/component-for-all-radio-options.js';
import ComponentForSingleRadioOption from '../forms/component-for-single-radio-option.js';
import { ensureSafeComponent } from '@embroider/util';

export default class RadioButtonGroupExampleTwoComponent extends Component {
  // BEGIN-SNIPPET radio-button-group-example-2.js
  formSchema = {
    formSettings: {
      formName: 'radioButtonGroupExample2',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'radioButtons2',
        fieldType: 'radioButtonGroup',
        fieldLabel: 'Custom label components',
        optionLabelComponent: {
          componentClass: ensureSafeComponent(ComponentForAllRadioOptions),
          props: {
            infoLink: 'https://example.com',
          },
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
          {
            label: 'Option 3',
            value: '3',
            optionLabelComponent: {
              componentClass: ensureSafeComponent(
                ComponentForSingleRadioOption,
              ),
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
