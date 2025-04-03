import Service from '@ember/service';
import PhoneNumberWithCountryCodeComponent from '../components/custom-fields/phone-number-with-country-code';
import IconArrowUp from '../components/svg/icons/icon-arrow-up';
import RequestInFlightIcon from '../components/button-icons/request-in-flight-icon';
export default class EmberChangesetWebforms extends Service {
  changesetWebformsDefaults = {
    // BEGIN-SNIPPET app-wide-classes.js
    // In services/ember-changeset-webforms.js at changesetWebformsDefaults.generalClassNames
    generalClassNames: {
      labelElement: ['$inherited', 'app-wide-label-element-class'],
    },
    // END-SNIPPET
    formSettings: {
      submitButtonIcon: { componentClass: IconArrowUp },
      discardChangesButtonIcon: {
        componentClass: IconArrowUp,
      },
      clearFormButtonIcon: { componentClass: IconArrowUp },
      addCloneButtonIcon: { componentClass: IconArrowUp },
      removeCloneButtonIcon: {
        componentClass: IconArrowUp,
      },
      requestInFlightIcon: {
        componentClass: RequestInFlightIcon,
      },
    },
    // BEGIN-SNIPPET app-wide-field-options.js
    // In services/ember-changeset-webforms.js at changesetWebformsDefaults.fieldTypes
    fieldTypes: [
      {
        fieldType: 'radioButtonGroup',
        classNames: {
          fieldLabel: [
            '$inherited',
            'app-wide-radio-button-group-field-label-class',
          ],
          labelElement: [
            '$inherited',
            'app-wide-radio-button-group-label-element-class',
          ],
        },
      },
      {
        fieldType: 'phoneNumberWithCountryCode',
        componentClass: PhoneNumberWithCountryCodeComponent,
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
    // END-SNIPPET
  };
}
