import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormWideClassSettingsComponent extends Component {
  @tracked changesetIsValid;

  dynamicIncludeExcludeConditions = {
    valueDoesNotEqual: (value, condition) =>
      value !== condition.valueDoesNotEqual,
  };

  // BEGIN-SNIPPET omitted-fields-example-2.js"
  formSchema = {
    formSettings: {
      formName: 'formClassNames',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'meal',
        fieldLabel: 'Would you like to order a meal?',
        fieldType: 'radioButtonGroup',
        validatesOn: ['insert'],
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
        validatesOn: ['insert'],
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: { presence: true, description: 'Meal option' },
          },
        ],
        options: ['Beef', 'Chicken', 'Vegetarian', 'Vegan'],
        dynamicIncludeExclude: {
          default: 'exclude',
          toggleDefault: {
            ruleType: 'anyConditionsTrue',
            conditions: [
              {
                fieldId: 'meal',
                valueDoesNotEqual: 'No',
              },
            ],
          },
        },
      },
    ],
  };

  @action
  onFieldValueChange(formField, changesetWebform, snapshot) {
    changesetWebform.validateFields().then((res) => {
      this.changesetIsValid = changesetWebform.changeset.isValid;
    });
  }
  // END-SNIPPET
}
