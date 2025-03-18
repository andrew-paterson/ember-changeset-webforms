import Component from '@glimmer/component';
import PowerSelectCountryDisplayComponent from '../forms/power-select-custom-trigger-component';
import { ensureSafeComponent } from '@embroider/util';

export default class PowerSelectExampleThreeComponent extends Component {
  // BEGIN-SNIPPET power-select-example-4.js
  formSchema = {
    formSettings: {
      formName: 'powerSelectExample4',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'country',
        fieldType: 'powerSelect',
        fieldLabel: 'Select country',
        extra: {
          triggerItemComponent:
            '[Some additional data from @formField.extra.triggerComponent]',
        },
        triggerComponent: ensureSafeComponent(
          PowerSelectCountryDisplayComponent,
        ),
        options: ['ABW', 'AFG', 'AGO', 'ALB', 'AND'],
      },
    ],
  };
  // END-SNIPPET
}
