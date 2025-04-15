import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class fieldMethodsExample1Component extends Component {
  // BEGIN-SNIPPET field-methods-example-3.js"
  @tracked formIsValid;
  @tracked formValidityChecked;

  formSchema = {
    formSettings: {
      formName: 'fieldMethods3',
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
  toggleOmission() {
    this.nameField.setOmission(!this.nameField.isOmitted);
  }

  // END-SNIPPET
}
