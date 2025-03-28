import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormWideClassSettingsComponent extends Component {
  @tracked changesetIsValid;
  // BEGIN-SNIPPET omitted-fields-example-1.js"
  formSchema = {
    formSettings: {
      formName: 'omittingFields1',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldId: 'mealRequired',
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
        omitted: true,
        validatesOn: ['insert'],
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
  onFieldValueChange(formField, changesetWebform, snapshot) {
    if (formField.fieldId === 'mealRequired') {
      if (formField.fieldValue === 'Yes') {
        changesetWebform.includeField('mealOption');
      } else {
        changesetWebform.omitField('mealOption');
      }
    }
    changesetWebform.validateFields().then((res) => {
      this.changesetIsValid = changesetWebform.changeset.isValid;
    });
  }

  // END-SNIPPET
}
