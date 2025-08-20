import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormWideClassSettingsComponent extends Component {
  @tracked changesetIsValid;
  // BEGIN-SNIPPET omitted-fields-example-3.js"

  dynamicIncludeExcludeConditions = {
    valueDoesNotEqual: (value, condition) =>
      value !== condition.valueDoesNotEqual,
  };

  formSchema = {
    formSettings: {
      formName: 'omittingFields3',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'mealRequired',
        fieldLabel: 'Would you like to order a meal?',
        fieldType: 'radioButtonGroup',
        validatesOn: ['$inherited', 'insertWithValue'],
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: {
              presence: true,
              description: 'Would you like to order a meal',
            },
          },
        ],
        options: ['Yes', 'No'],
      },
      {
        fieldId: 'mealOption',
        fieldType: 'radioButtonGroup',
        fieldLabel: 'Please select a meal option',
        validatesOn: ['$inherited', 'insertWithValue'],
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: { presence: true, description: 'Meal option' },
          },
        ],
        options: ['Beef', 'Chicken', 'Vegetarian', 'Vegan'],
        omitted: {
          returns: false,
          where: 'anyConditionsTrue',
          conditions: [
            {
              fieldId: 'mealRequired',
              valueDoesNotEqual: 'No',
            },
          ],
        },
      },
    ],
  };

  @action
  async onFieldValueChange(formField, changesetWebform, snapshot) {
    this.changesetIsValid =
      !changesetWebform.hasValidationErrors &&
      !changesetWebform.hasUnvalidatedFields;
  }
  // END-SNIPPET
}
