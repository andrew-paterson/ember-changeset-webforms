import Service from '@ember/service';
import PhoneNumberWithCountryCodeComponent from '../components/custom-fields/phone-number-with-country-code';
import IconArrowUp from '../components/svg/icons/icon-arrow-up';
import RequestInFlightIcon from '../components/button-icons/request-in-flight-icon';
export default class EmberChangesetWebforms extends Service {
  changesetWebformsDefaults = {
    // BEGIN-SNIPPET app-wide-classes.js
    // In services/ember-changeset-webforms.js at changesetWebformsDefaults.classNames
    classNames: {
      labelElement: ['$inherited', 'app-wide-label-element-class'],
    },
    // END-SNIPPET
    formSettings: {
      submitButtonIcon: { componentClass: IconArrowUp },
      resetFormButtonIcon: {
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
    // BEGIN-SNIPPET custom-parser-for-all-fields.js
    // In services/ember-changeset-webforms.js at changesetWebformsDefaults.fieldTypes
    fieldSettings: {
      customParser(field) {
        if (field.fieldLabel) {
          field.fieldLabel = field.fieldLabel.replace(
            'bluthcompany.com',
            'sitwell.com',
          );
          field.placeholder = field.placeholder.replace(
            'bluthcompany.com',
            'sitwell.com',
          );
        }
        return field;
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
      // END-SNIPPET
      // BEGIN-SNIPPET custom-field-definition.js
      // In the changesetWebformsDefaults object
      {
        fieldType: 'phoneNumberWithCountryCode',
        // import PhoneNumberWithCountryCodeComponent from '../components/custom-fields/phone-number-with-country-code';
        componentClass: PhoneNumberWithCountryCodeComponent,
        alwaysValidateOn: ['$inherited', 'focusOutPhoneNumberInput'],
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
      // END-SNIPPET
      // BEGIN-SNIPPET custom-parser-in-service.js
      // In the changesetWebformsDefaults object  at changesetWebformsDefaults.fieldTypes
      {
        fieldType: 'input',
        customParser(field) {
          if (field.inputType === 'email') {
            field.validatesOn = ['insertWithValue'];
            field.validationRules = field.validationRules || [];
            const existing = field.validationRules.find(
              (rule) =>
                rule.validationMethod === 'validateFormat' &&
                rule.arguments?.type === 'email',
            );
            if (!existing) {
              field.validationRules.push({
                validationMethod: 'validateFormat',
                arguments: { type: 'email' },
              });
            }
          }
          return field;
        },
      },
      // END-SNIPPET
    ],
  };
}
