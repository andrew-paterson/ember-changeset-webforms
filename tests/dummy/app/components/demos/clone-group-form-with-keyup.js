import Component from '@glimmer/component';

export default class CloneGroupFormWithKeyupComponent extends Component {
  // BEGIN-SNIPPET clone-group-form-keyup.js
  formSchema2 = {
    formSettings: {
      formName: 'addEmailsForm',
      submitButtonText: 'Submit',
      clearFormAfterSubmit: true,
    },

    fields: [
      {
        fieldId: 'countryCodes',
        fieldLabel: 'Country ISO codes',
        fieldType: 'clone-group',
        minClones: 2,
        cloneFieldSchema: {
          fieldLabel: 'Country code',
          fieldType: 'input',
          inputType: 'text',
          hideLabel: true,
          validationEvents: ['keyUp'],
          validationRules: [
            {
              validationMethod: 'validateLength',
              arguments: {
                max: 3,
                description: 'Country code',
              },
            },
          ],
        },
      },
    ],
  };
  // END-SNIPPET

  // end-of-conent
}
