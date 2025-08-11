import Component from '@glimmer/component';
import { action } from '@ember/object';
export default class FormWideClassSettingsComponent extends Component {
  // BEGIN-SNIPPET attr-functions.js"
  formSchema = {
    formSettings: {
      formName: 'attrFunctions',
    },
    attrFunctions: {
      submitButton(element, changesetWebform, _formField, _classNameSettings) {
        if (changesetWebform.formSettings.requestInFlight) {
          element.classList.replace('btn-primary', 'btn-success');
        } else {
          element.classList.replace('btn-success', 'btn-primary');
        }
      },
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
      },
    ],
  };

  @action
  submit() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  }
  // END-SNIPPET
}
