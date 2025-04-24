// BEGIN-SNIPPET custom-fields-demo.js
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import validatePhoneNumber from '../../validators/phone-number';

export default class DemosCustomFieldUsageComponent extends Component {
  @tracked phoneNumber;

  formSchema = {
    validators: {
      validatePhoneNumber,
    },
    formSettings: {
      formName: 'Phone number with country code',
    },
    fields: [
      {
        fieldId: 'phoneNumber',
        fieldType: 'phoneNumberWithCountryCode',
        fieldLabel: 'Phone number',
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: true,
          },
          {
            validationMethod: 'validatePhoneNumber',
          },
        ],
      },
    ],
  };

  @action
  updatePhoneNumber(formField, changesetWebform) {
    if (changesetWebform.changeset.isValid) {
      this.phoneNumber = formField.fieldValue;
    } else {
      this.phoneNumber = null;
    }
  }
}
// END-SNIPPET
