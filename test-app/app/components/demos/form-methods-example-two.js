import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormMethodsExample1Component extends Component {
  // BEGIN-SNIPPET form-methods-example-2.js"
  formSchema = {
    formSettings: {
      formName: 'formMethods2',
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
        validatesOn: ['$inherited', 'insertWithValue'],
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: {
              presence: true,
            },
            validationMethod: 'validateFormat',
            arguments: {
              type: 'email',
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
    const emailField = this.changesetWebform.fields.find(
      (field) => field.fieldId === 'email',
    );
    emailField.updateValue('steveholt@bluthcompany.com');
    await this.changesetWebform.validate({ skipUnvalidated: true });
  }
  // END-SNIPPET
}
