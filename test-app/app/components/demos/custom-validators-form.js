// BEGIN-SNIPPET custom-validators-form.js
import Component from '@glimmer/component';
import validateUniqueness from '../../validators/uniqueness';

export default class IntegratingCustomValidators extends Component {
  formSchema = {
    validators: {
      validateUniqueness,
    },
    formSettings: {
      formName: 'unique',
      submitButtonText: 'Submit',
    },
    fields: [
      {
        fieldId: 'primaryNumber',
        fieldLabel: 'Primary Number',
        fieldType: 'input',
        inputType: 'text',
        validationRules: [
          {
            validationMethod: 'validateUniqueness',
            arguments: {
              descriptionsMap: {
                primaryNumber: 'primary number',
                recoveryNumber: 'recovery number',
              },
            },
          },
        ],
      },
      {
        fieldId: 'recoveryNumber',
        fieldLabel: 'Recovery Number',
        fieldType: 'input',
        inputType: 'text',
        validationRules: [
          {
            validationMethod: 'validateUniqueness',
            arguments: {
              descriptionsMap: {
                primaryNumber: 'primary number',
                recoveryNumber: 'recovery number',
              },
            },
          },
        ],
      },
    ],
  };
}
// END-SNIPPET
