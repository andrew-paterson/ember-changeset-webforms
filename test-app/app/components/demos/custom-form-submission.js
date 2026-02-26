import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
// BEGIN-SNIPPET custom-form-submission.js"
import preFlightForm from 'validated-changeset-webforms/utils/preflight-form';

export default class FormWideClassSettingsComponent extends Component {
  @tracked alert;
  formSchema = {
    formSettings: {
      formName: 'customFormSubmission',
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: true,
          },
        ],
      },
    ],
  };

  @action async onFormSubmit(changesetWebform) {
    await preFlightForm(changesetWebform);
    if (!changesetWebform.changeset.isValid) {
      return;
    }
    this.alert = {
      type: 'success',
      message: 'A completely custom form submission action was run.',
    };
  }
  // END-SNIPPET
}
