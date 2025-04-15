import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class fieldMethodsExample1Component extends Component {
  // BEGIN-SNIPPET field-methods-example-2.js"
  formSchema = {
    formSettings: {
      formName: 'fieldMethods2',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name (Min 3 chars)',
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: {
              presence: true,
            },
          },
          {
            validationMethod: 'validateLength',
            arguments: {
              min: 3,
              // max: 3,
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

  @action
  async externalValidation() {
    this.nameField.updateValue('New Name');
    await this.nameField.validate({ skipUnvalidated: true });
  }
  // END-SNIPPET
}
