import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormWideClassSettingsComponent extends Component {
  @tracked changesetIsValid;
  // BEGIN-SNIPPET omitted-fields-example-4.js"
  formSchema = {
    formSettings: {
      formName: 'omittingFields4',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'isMember',
        fieldLabel: 'Are you a member?',
        fieldType: 'radioButtonGroup',
        validatesOn: ['insert'],
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: {
              presence: true,
              description: 'Are you a member',
            },
          },
        ],
        options: ['Yes', 'No'],
      },
      {
        fieldId: 'mains',
        fieldType: 'input',
        inputType: 'number',
        min: 1,
        max: 3,
        fieldLabel: 'How many main meals would you like to order?',
        validationRules: [
          {
            validationMethod: 'validateFormat',
            arguments: { type: 'number' },
          },
        ],
      },
      {
        fieldId: 'sides',
        fieldType: 'input',
        inputType: 'number',
        min: 1,
        max: 3,
        fieldLabel: 'How many side dishes would you like to order?',
        validationRules: [
          {
            validationMethod: 'validateFormat',
            arguments: { type: 'number' },
          },
        ],
      },
      {
        fieldId: 'freeDrink',
        fieldType: 'radioButtonGroup',
        fieldLabel: `You've qualified for a free drink!  You can select one of the following:`,
        options: ['Orange juice', 'Water', 'Chocolate milk'],
        omitted: {
          returns: false,
          where: 'anyConditionsTrue',
          conditions: [
            {
              fieldId: 'isMember',
              valueEquals: 'Yes',
            },
            {
              returns: true,
              where: 'allConditionsTrue',
              conditions: [
                {
                  fieldId: 'mains',
                  valueEquals: '3',
                },
                {
                  fieldId: 'sides',
                  valueEquals: '3',
                },
              ],
            },
          ],
        },
      },
    ],
  };
  // END-SNIPPET
}
