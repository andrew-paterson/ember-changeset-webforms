import Controller from '@ember/controller';
import addonDefaults from 'ember-changeset-webforms/utils/addon-defaults';
import getWithDefaultUtil from 'validated-changeset-webforms/dist/utils/get-with-default';
import parseChangesetWebformField from 'validated-changeset-webforms/dist/utils/parse-changeset-webform-field';
import eventNamesFromFunctionCalls from '../../utils/event-names-from-function-calls';

export default class Fieldvalidation extends Controller {
  addonDefaults = addonDefaults;

  get fieldSettingsValidateOnString() {
    const formSchemaWithDefaultsWithEachFieldType = getWithDefaultUtil(
      [addonDefaults],
      {
        fields: addonDefaults.fieldTypes.map((item) => ({
          fieldType: item.fieldType,
          fieldId: item.fieldType,
          fieldLabel: item.fieldType,
        })),
      },
    );
    const final = {};

    formSchemaWithDefaultsWithEachFieldType.fields =
      formSchemaWithDefaultsWithEachFieldType.fields.map((field) =>
        parseChangesetWebformField(field),
      );

    formSchemaWithDefaultsWithEachFieldType.fields.forEach((field) => {
      if (field.validatesOn.length) {
        final[field.fieldType] = final[field.fieldType] || {};
        final[field.fieldType].validatesOn = [
          '// Included by addon defaults //',
        ].concat(field.validatesOn);
        if (!eventNamesFromFunctionCalls[field.fieldType]) {
          return;
        }
        final[field.fieldType].validatesOn.push(
          '// Not included by addon defaults //',
        );
        (eventNamesFromFunctionCalls[field.fieldType] || []).forEach(
          (eventName) => {
            if (!final[field.fieldType].validatesOn.includes(eventName)) {
              final[field.fieldType].validatesOn.push(eventName);
            }
          },
        );
      }
    });
    return JSON.stringify(final, null, 2)
      .replace(/"\/\//g, `//`)
      .replace(/\/\/"/g, ``);
  }
}
