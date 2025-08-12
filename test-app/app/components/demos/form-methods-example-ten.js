import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormMethodsExample1Component extends Component {
  // BEGIN-SNIPPET form-methods-example-10.js"
  @tracked nextStepEnabled;

  formSchema = {
    formSettings: {
      formName: 'formMethods10',
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
      {
        fieldId: 'email',
        fieldType: 'input',
        inputType: 'email',
        fieldLabel: 'Email',
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
    this.setNextStepEnabled(changesetWebform);
  }

  @action
  afterFieldValidation(formField, changesetWebform) {
    this.setNextStepEnabled(changesetWebform);
  }

  @action setNextStepEnabled(changesetWebform) {
    this.nextStepEnabled = !changesetWebform.hasValidationErrors;
  }
  // END-SNIPPET
}
