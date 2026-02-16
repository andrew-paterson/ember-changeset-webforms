import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class fieldMethodsExample1Component extends Component {
  // BEGIN-SNIPPET field-methods-example-4.js"
  formSchema = {
    formSettings: {
      formName: 'fieldMethods4',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
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

  @action updateNameField() {
    this.nameField.updateValue('New Name');
  }

  // END-SNIPPET
}
