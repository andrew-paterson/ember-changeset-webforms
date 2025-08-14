// BEGIN-SNIPPET controller.js
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
// BEGIN-SNIPPET changeset-webform-with-query-params-imports.js
// Controller
import {
  createFormSchema,
  setQueryParamsWithDefaults,
  formDataFromUrlParams,
  applyFormValues,
} from 'ember-changeset-webforms/utils/changeset-webform-with-query-params';
// END-SNIPPET
export default class FormSchemaFromQueryParams extends Controller {
  authenticated = 'false';

  // BEGIN-SNIPPET query-params-tracked-props.js
  // Controller
  @tracked number;
  @tracked size;
  @tracked name;
  @tracked sort;
  @tracked inserted_at;
  @tracked inserted_from;
  @tracked inserted_to;
  // END-SNIPPET

  // BEGIN-SNIPPET query-params-in-the-usual-way.js
  // Controller
  queryParams = ['authenticated'];
  // END-SNIPPET
  // BEGIN-SNIPPET query-params-objects-definition.js
  // Controller
  queryParamsObjects = [
    {
      paramName: 'number',
      defaultValue: 1,
      ecwFieldSchema: {
        fieldLabel: 'Page number',
        fieldType: 'input',
        inputType: 'number',
      },
    },
    {
      paramName: 'size',
      defaultValue: 50,
      ecwFieldSchema: {
        fieldLabel: 'Page size',
        fieldType: 'input',
        inputType: 'number',
      },
    },
    {
      paramName: 'sort',
      defaultValue: '-inserted_at',
      ecwFieldSchema: {
        fieldLabel: 'Sort',
        fieldType: 'powerSelect',
        options: [
          { label: 'Newest first', paramName: '-inserted_at' },
          { label: 'Oldest first', paramName: 'inserted_at' },
          { label: 'Name A-Z', paramName: 'name' },
          { label: 'Name Z-A', paramName: '-name' },
        ],
        optionDisplayProp: 'label',
      },
      fieldValueFromUrlParamFunc(queryParamsObject, qpValue) {
        return queryParamsObject.ecwFieldSchema.options.find(
          (option) => option.paramName === qpValue,
        );
      },
      applyValuesFunc(fieldValue) {
        return fieldValue.paramName;
      },
    },
    {
      paramName: 'name',
      ecwFieldSchema: {
        fieldLabel: 'Name',
        fieldType: 'input',
        inputType: 'text',
      },
    },
    {
      paramName: 'inserted_from',
      type: 'date',
      ecwFieldSchema: {
        fieldLabel: 'First day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
        dateTimeDisplayFormat: 'YYYY-MM-DD',
        closeDatePickerOnSelect: true,
        dateRangeSettings: {
          rangePosition: 'start',
          rangePartnerFieldId: 'inserted_to',
        },
      },
    },
    {
      paramName: 'inserted_to',
      type: 'date',
      ecwFieldSchema: {
        fieldLabel: 'Last day',
        fieldType: 'powerDatePicker',
        dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
        dateTimeDisplayFormat: 'YYYY-MM-DD',
        fixedTime: '23:59:59',
        closeDatePickerOnSelect: true,
        dateRangeSettings: {
          rangePosition: 'end',
          rangePartnerFieldId: 'inserted_from',
        },
      },
    },
  ];
  // END-SNIPPET

  // BEGIN-SNIPPET set-query-params-with-defaults.js
  // Controller
  constructor() {
    super(...arguments);
    setQueryParamsWithDefaults(this, this.queryParamsObjects);
  }
  //END-SNIPPET

  // BEGIN-SNIPPET create-changeset-webform-with-query-params.js
  // Controller
  get queryParamsFormSchema() {
    return createFormSchema(
      this.queryParamsObjects,
      'formSchemaFromQueryparamsExampleForm',
      {
        formSettings: {
          submitButtonText: 'Apply Filters',
          clearFormButtonText: 'Reset filters',
          clearFormButton: true,
          submitAfterClear: true,
        },
      },
    );
  }
  // END-SNIPPET

  // BEGIN-SNIPPET generate-form-data-from-query-params.js
  // Controller
  get queryParamsFormData() {
    return formDataFromUrlParams(this, this.queryParamsObjects);
  }
  // END-SNIPPET

  // BEGIN-SNIPPET run-the-apply-form-values-function-on-submit.js
  // Controller
  @action
  applyFormValues(formData) {
    applyFormValues(this, this.queryParamsObjects, formData);
  }
  // END-SNIPPET
}
// END-SNIPPET
