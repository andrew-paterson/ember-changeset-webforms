import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class fieldMethodsExample1Component extends Component {
  // BEGIN-SNIPPET field-methods-example-1.js"
  @tracked formIsValid;
  @tracked formValidityChecked;

  formSchema = {
    formSettings: {
      formName: 'fieldMethods1',
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

  @action
  async externalValidation() {
    await this.nameField.validate();
  }
  // END-SNIPPET
}
