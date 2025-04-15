import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormMethodsExample1Component extends Component {
  // BEGIN-SNIPPET form-methods-example-4.js"
  @tracked formIsValid;
  @tracked formValidityChecked;

  formSchema = {
    formSettings: {
      formName: 'formMethods1',
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
    this.changesetWebform = changesetWebform;
  }

  @action
  async externalValidation() {
    await this.changesetWebform.validate();
  }

  @action
  toggleEmailField() {
    const emailField = this.changesetWebform.fields.find(
      (field) => field.fieldId === 'email',
    );
    this.changesetWebform.setFieldOmission('email', !emailField.isOmitted);
  }

  @action
  async checkFormValidity() {
    this.formValidityChecked = true;
    this.formIsValid = await this.changesetWebform.isValid();
  }
  // END-SNIPPET
}
