import Component from '@glimmer/component';
import { action } from '@ember/object';
export default class ClearAfterSubmitFormComponent extends Component {
  // BEGIN-SNIPPET clear-after-submit-form-schema.js
  formSchema = {
    formSettings: {
      formName: 'clearAfterSubmitForm',
      clearFormAfterSubmit: true,
      submitButtonText: 'Create account',
      clearFormButton: true,
      discardChangesButton: true,
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
      },
      {
        fieldId: 'email',
        fieldType: 'input',
        fieldLabel: 'email',
        defaultValue: 'test@email.com',
      },
    ],
  };
  // END-SNIPPET
  @action
  submit() {
    console.log('submit');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }
}
