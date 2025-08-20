import Component from '@glimmer/component';

export default class CloneGroupFormComponent extends Component {
  // BEGIN-SNIPPET clone-group-form-function-field-label.js
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
        fieldType: 'clone-group',
        minClones: 2,
        maxClones: 4,
        validationRules: [
          {
            validationMethod: 'validateLength',
            arguments: {
              description: 'emails',
              message: 'Too many {description} (maximum is {max}).',
              max: 4,
            },
          },
        ],
        cloneButtonText: 'Add email address',
        cloneFieldSchema: {
          fieldLabel: (clone) => {
            const counter = ['first', 'second', 'third', 'fourth'];
            const index = clone.index;
            return `Label for ${counter[index]} email`;
          },
          placeholder: (clone) => {
            const counter = ['1st', '2nd', '3rd', '4th'];
            const index = clone.index;
            return `Placeholder for ${counter[index]} email`;
          },
          fieldType: 'input',
          inputType: 'email',
          hideLabel: false,
        },
      },
    ],
  };
  //END-SNIPPET
}
