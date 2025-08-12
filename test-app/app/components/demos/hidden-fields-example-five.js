import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormWideClassSettingsComponent extends Component {
  @tracked changesetIsValid;
  // BEGIN-SNIPPET omitted-fields-example-5.js"
  formSchema = {
    formSettings: {
      formName: 'omittingFields5',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'mealRequired',
        fieldLabel: 'Would you like to order a meal?',
        fieldType: 'radioButtonGroup',
        validatesOn: ['insertWithValue'],
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
        omitted: true,
        validatesOn: ['insertWithValue'],
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: { presence: true, description: 'Meal option' },
          },
        ],
        options: ['Beef', 'Chicken', 'Vegetarian', 'Vegan'],
      },
    ],
  };

  @action
  async onFieldValueChange(formField, changesetWebform, snapshot) {
    const mealOptionField = changesetWebform.fields.find(
      (field) => field.fieldId === 'mealOption',
    );
    if (formField.fieldId === 'mealRequired') {
      if (formField.fieldValue === 'Yes') {
        mealOptionField.setOmission(false);
      } else {
        mealOptionField.setOmission(true);
      }
    }
    this.changesetIsValid =
      !changesetWebform.hasValidationErrors &&
      !changesetWebform.hasUnvalidatedFields;
  }
  // END-SNIPPET
}
