import Component from '@glimmer/component';
import PowerSelectCountryDisplayComponent from '../forms/power-select-custom-trigger-component';
import { ensureSafeComponent } from '@embroider/util';

export default class PowerSelectExampleFoutComponent extends Component {
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
            ' => Data from @formField.extra.triggerComponent',
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
