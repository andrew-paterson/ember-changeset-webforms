import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormWideClassSettingsComponent extends Component {
  @tracked serverResponseType = 'Asynchronous success response';
  @tracked alert;
  // BEGIN-SNIPPET default-form-submission.js"
  formSchema = {
    formSettings: {
      formName: 'defaultFormSubmission',
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: true,
          },
        ],
      },
    ],
  };
  @action submitData(data, changesetWebform) {
    if (this.serverResponseType.startsWith('Asynchronous')) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (this.serverResponseType.includes('error')) {
            reject(new Error(this.serverResponseType));
          } else {
            resolve(this.serverResponseType);
          }
        }, 500);
      });
    } else {
      if (this.serverResponseType.includes('error')) {
        throw new Error(this.serverResponseType);
      } else {
        return this.serverResponseType;
      }
    }
  }

  @action submitSuccess(response, arg2, arg3) {
    console.log('-----------------------response', response);
    console.log('-----------------------arg2', arg2);
    console.log('-----------------------arg3', arg3);
    this.alert = {
      type: 'success',
      message: response,
    };
  }

  @action submitError(error) {
    this.alert = {
      type: 'danger',
      message: error.message,
    };
  }
  // END-SNIPPET

  @action afterValidateFields() {
    console.log('afterValidateFields');
  }
  @action formValidationPassed() {
    console.log('formValidationPassed');
  }
  @action beforeSubmitForm() {
    console.log('beforeSubmitForm');
  }
  @action formValidationFailed() {
    console.log('formValidationFailed');
  }

  serverResponseFormSchema = {
    formSettings: {
      formName: 'defaultFormSubmission',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'serverResponseType',
        fieldType: 'radioButtonGroup',
        fieldLabel: 'Server response type',
        options: [
          'Asynchronous success response',
          'Asynchronous error response',
          'Synchronous success response',
          'Synchronous error response',
        ],
      },
    ],
  };

  @action onFieldValueChange(formField, changesetWebform) {
    this.serverResponseType = formField.fieldValue;
  }

  @action removeAlert() {
    this.alert = null;
  }
}
