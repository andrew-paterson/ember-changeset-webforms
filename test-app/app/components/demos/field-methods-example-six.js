import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class fieldMethodsExample1Component extends Component {
  // BEGIN-SNIPPET field-methods-example-6.js"
  formSchema = {
    formSettings: {
      formName: 'fieldMethods6',
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
    this.nameField = changesetWebform.fields.find(
      (field) => field.fieldId === 'name',
    );
  }

  @action resetNameField() {
    this.nameField.reset();
  }

  // END-SNIPPET
}
