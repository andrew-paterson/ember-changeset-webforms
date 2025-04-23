import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class fieldMethodsExample1Component extends Component {
  // BEGIN-SNIPPET field-methods-example-5.js"
  formSchema = {
    formSettings: {
      formName: 'fieldMethods5',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
        validatesOn: ['valueExternallyUpdated'],
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
    this.nameField.eventLog.push('valueExternallyUpdated');
    this.nameField.updateValue('New Name');
  }

  // END-SNIPPET
}
