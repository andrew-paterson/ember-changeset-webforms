import Service from '@ember/service';
import PhoneNumberWithCountryCodeComponent from '../components/custom-fields/phone-number-with-country-code.js';
import { ensureSafeComponent } from '@embroider/util';
export default class EmberChangesetWebforms extends Service {
  // BEGIN-SNIPPET app-wide-classes.js
  changesetWebformsDefaults = {
    generalClassNames: {
      labelElement: ['$inherited', 'label-el'],
    },
    fieldTypes: [
      {
        fieldType: 'radioButtonGroup',
        classNames: {
          labelElement: ['$inherited', 'radio-button-group-label'],
        },
      },
      {
        fieldType: 'phoneNumberWithCountryCode',
        componentClass: ensureSafeComponent(
          PhoneNumberWithCountryCodeComponent,
        ),
        classNames: {
          fieldControls: [
            '$validationClassNames',
            'form-control',
            'p-0',
            'bg-white',
          ],
          phoneNumberInput: [
            'form-control ',
            'border ',
            'border-0 ',
            'border-start',
          ],
          countryCodeTrigger: [
            'input-group-text ',
            'pe-5 ',
            'border ',
            'border-0',
          ],
        },
      },
    ],
  };
}
