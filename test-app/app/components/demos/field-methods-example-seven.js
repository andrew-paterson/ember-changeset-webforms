import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class fieldMethodsExample1Component extends Component {
  // BEGIN-SNIPPET field-methods-example-7.js"
  formSchema = {
    formSettings: {
      formName: 'fieldMethods7',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
        defaultValue: 'Default Name',
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: {
              presence: true,
            },
          },
        ],
      },
    ],
  };

  @action
  afterGenerateChangesetWebform(changesetWebform) {
    this.nameField = changesetWebform.getField('name');
  }

  @action pushErrors() {
    this.nameField.pushErrors(['This is a custom error message']);
  }

  @action updateErrorMessage(event) {
    this.nameField.pushErrors([event.target.value]);
    document.querySelector('[data-test-id="error-message-input"]').value = '';
  }
  // END-SNIPPET
}
