import layout from '../../templates/components/forms/signup-form';
import { inject as service } from '@ember/service';
import FormContainer from './form-container';
import EmberObject from '@ember/object';

export default FormContainer.extend({
  layout,
  session: service(),

  init: function() {
    this._super(...arguments);
    this.signUpFormSchema = this.get('session.signupFormSchema');

    this.standaloneField = {
      fieldId: 'standalone',
      label: 'Standalone',
      fieldType: 'input',
      hideLabel: true,
      validationRules: [{'validationMethod': 'required'}],
      validationEvents: ['focusOut', 'keyUp', 'insert'],
      inputType: 'text',
      trim: true,
    }
  },

  actions: {
    customValidations: function(fieldObject, formFields) {
      var error;
      if (fieldObject.fieldId === 'password' || fieldObject.fieldId === 'password_confirmation') {
        var passwordFieldObject = formFields.findBy('fieldId', 'password');
        var passwordConfirmationFieldObject = formFields.findBy('fieldId', 'password_confirmation');
        var password = passwordFieldObject.value;
        var passwordConfirmation = passwordConfirmationFieldObject.value;
        if (password && passwordConfirmation) {
          if (password !== passwordConfirmation) {
            passwordFieldObject.set('error', 'The passwords do not match.');
            passwordConfirmationFieldObject.set('error', 'The passwords do not match.');
          } else {
            passwordFieldObject.set('error', false);
            passwordConfirmationFieldObject.set('error', false);
          }
        } else {
          passwordFieldObject.set('error', null);
          passwordConfirmationFieldObject.set('error', null);
        }
      }

      if (fieldObject.fieldId === 'personal_details.favourite_colours') {
        var value = fieldObject.value || [];
        if (value.length === 0) {
          fieldObject.set('error', 'Please choose at least one colour.');
        } else {
          fieldObject.set('error', false);
        }
      }
    },

    saveFail: function(errorResponse, formFields) {
      var emailField = formFields.findBy('fieldId', 'email');
      emailField.set('error', 'Email already taken');
      var error = errorResponse.errors[0];
      var errorDetail = "test"
      // Todo - if error code is 40* use error detail, if not use hard coded fallback.
      var errorMessage = {
        'name': 'signupFormErrors',
        'type': 'error',
        'sticky': true,
        'content': errorDetail
      };
      this.setProperty('systemMessage', errorMessage);
    },

    afterKeyUpAction: function(value, event, formField) {
      if (event) {
        if (event.key === 'KeyP' || event.code === 'KeyP') {
        }
      }
    }
  }
});