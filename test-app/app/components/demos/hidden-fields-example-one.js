import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormWideClassSettingsComponent extends Component {
  @tracked changesetIsValid;
  // BEGIN-SNIPPET hidden-fields-example-1.js"
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
        hidden: true,
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
    if (formField.fieldId === 'meal') {
      if (formField.fieldValue === 'Yes') {
        changesetWebform.showField('mealOption');
      } else {
        changesetWebform.hideField('mealOption');
      }
    }
    changesetWebform.validateFields().then((res) => {
      this.changesetIsValid = changesetWebform.changeset.isValid;
    });
  }

  // END-SNIPPET
}
