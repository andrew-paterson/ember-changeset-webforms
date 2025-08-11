// BEGIN-SNIPPET clicker-example-1.js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ClickerExampleOneFormSchema extends Component {
  clickerExample1FormSchema = {
    formSettings: {
      formName: 'clickerExample1',
      hideSubmitButton: true,
    },
    fields: [
      {
        fieldLabel: 'Toggle advanced options',
        hideLabel: true,
        fieldId: 'toggleAdvanced',
        fieldType: 'clicker',
        attrsFromConfig: {
          classNames: {
            clickerElement: ['$inherited', 'btn', 'btn-primary'],
          },
        },
        clickerText: 'Advanced options',
        showAdvanced: false,
      },
      {
        fieldId: 'advanced',
        fieldType: 'input',
        fieldLabel: 'Advanced setting',
        omitted: true,
        advancedSetting: true,
      },
    ],
  };

  @action
  onUserInteractionClicker1(formField, changesetWebform, eventName) {
    if (formField.fieldId === 'toggleAdvanced' && eventName === 'click') {
      formField.showAdvanced = !formField.showAdvanced;
      const advancedFields = changesetWebform.fields.filter(
        (field) => field.advancedSetting,
      );
      advancedFields.forEach((field) => field.setOmission(!field.omitted));
    }
  }
}
// END-SNIPPET
