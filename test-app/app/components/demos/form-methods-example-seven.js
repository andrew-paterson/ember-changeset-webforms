import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { TrackedArray } from 'tracked-built-ins';
import { action } from '@ember/object';

export default class FormMethodsExample1Component extends Component {
  // BEGIN-SNIPPET form-methods-example-7.js"
  @tracked actionsLog = TrackedArray.from([]);

  data = {
    name: 'Steve Holt',
    email: 'steveholt@bluthcompany.com',
  };
  formSchema = {
    formSettings: {
      formName: 'formMethods7',
      clearFormButton: true,
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
          {
            validationMethod: 'validateFormat',
            arguments: { type: 'email' },
          },
        ],
      },
    ],
  };

  @action
  beforeClearForm() {
    this.actionsLog.push('The beforeClearForm action was called');
  }
  @action
  afterClearForm() {
    this.actionsLog.push('The afterClearForm action was called');
  }
  // END-SNIPPET
}
