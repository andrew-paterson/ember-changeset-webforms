import Component from '@glimmer/component';
import { action } from '@ember/object';
export default class FormWideClassSettingsComponent extends Component {
  // BEGIN-SNIPPET attr-functions.js"
  formSchema = {
    formSettings: {
      formName: 'attrFunctions',
    },
    attrFunctions: {
      submitButton(element, changesetWebform) {
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
        attrsFromConfig: {
          attrFunctions: {
            fieldLabel(element, _changesetWebform, _formField) {
              element.textContent = `${element.textContent} (Label loaded at ${new Date().toLocaleTimeString()}}`;
              ('This value is set by an attr function from the form field config.');
            },
          },
        },
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
