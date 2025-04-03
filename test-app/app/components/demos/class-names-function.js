import Component from '@glimmer/component';
import { action } from '@ember/object';
export default class FormWideClassSettingsComponent extends Component {
  // BEGIN-SNIPPET class-names-function.js"
  formSchema = {
    formSettings: {
      formName: 'classNamesFunction',
    },
    classNames: {
      submitButtonFn(
        classNamesArray,
        _classNameSettings,
        changesetWebform,
        _formField,
      ) {
        if (changesetWebform.formSettings.requestInFlight) {
          return classNamesArray
            .filter((item) => item !== 'btn-primary')
            .concat('btn-success');
        } else {
          return classNamesArray;
        }
      },
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
      },
    ],
  };
  @action submit() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  }
  // END-SNIPPET
}
