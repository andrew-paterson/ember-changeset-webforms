import Controller from '@ember/controller';

// BEGIN-SNIPPET login-form.js
export default Controller.extend({
  init: function() {
    this._super(...arguments);
    this.loginFormSchema = {
      settings: {
        formName: 'login',
        submitButtonText: 'Log in',
        showResetButton: false,
        hideSuccessValidation: true,
        hideLabels: true
      },
      fields: [{
        fieldId: 'email',
        fieldLabel: 'Email',
        fieldType: 'input',
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: true
        }, {
          validationMethod: 'validateFormat',
          arguments: { type: 'email' }
        }],
        inputType: 'text',
        class: 'email'
      },
      {
        fieldId: 'password',
        fieldLabel: 'Password',
        fieldType: 'input',
        hideLabel: true,  
        validationRules: [{
          validationMethod: 'validatePresence',
          arguments: true
        }],
        inputType: 'password',
        class: 'password'
      }]
    };
  },

  actions: {
    submit() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 2000);
      })
    },

    saveSuccess() {
      console.log('Success!');
    }
  }
});
//END-SNIPPET
