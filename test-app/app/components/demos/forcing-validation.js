import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class forcingValidationComponent extends Component {
  // BEGIN-SNIPPET forcing-validation.js"
  formSchema = {
    formSettings: {
      formName: 'forcingValidation',
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
    this.nameField.eventLog.push('forceValidation');
    this.nameField.updateValue('New Name');
  }
}
// END-SNIPPET
