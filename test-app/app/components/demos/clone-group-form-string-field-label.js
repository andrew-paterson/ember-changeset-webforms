import Component from '@glimmer/component';

export default class CloneGroupFormComponent extends Component {
  // BEGIN-SNIPPET clone-group-form-string-field-label.js
  formSchema = {
    formSettings: {
      formName: 'addEmails',
      submitButtonText: 'Submit',
      clearFormAfterSubmit: true,
    },
    fields: [
      {
        fieldId: 'emails',
        fieldLabel: 'User emails',
        fieldType: 'cloneGroup',
        cloneButtonText: 'Add email address',
        cloneFieldSchema: {
          fieldLabel: 'Email',
          placeholder: 'Enter email address',
          fieldType: 'input',
          inputType: 'email',
        },
      },
    ],
  };
  //END-SNIPPET
}
