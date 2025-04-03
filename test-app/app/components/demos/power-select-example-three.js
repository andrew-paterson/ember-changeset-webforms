import Component from '@glimmer/component';
import PowerSelectCountryDisplayComponent from '../forms/power-select-country-display-component';

export default class PowerSelectExampleThreeComponent extends Component {
  // BEGIN-SNIPPET power-select-example-3.js
  formSchema = {
    formSettings: {
      formName: 'powerSelectExample3',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'country',
        fieldType: 'powerSelect',
        fieldLabel: 'Select country',
        extra: {
          selectedItemComponent:
            '=> Data from @formField.extra.selectedItemComponent',
        },
        optionComponent: {
          componentClass: PowerSelectCountryDisplayComponent,
          props: {
            data: '=> Data from @formField.optionComponent.props.data',
          },
        },
        selectedItemComponent: PowerSelectCountryDisplayComponent,
        options: ['ABW', 'AFG', 'AGO', 'ALB', 'AND'],
      },
    ],
  };
  // END-SNIPPET
}
