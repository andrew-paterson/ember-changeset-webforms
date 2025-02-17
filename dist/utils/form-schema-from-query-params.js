import 'moment';

function formSchemaFromQueryParams(queryParamsObjects, formName) {
  var formSchema = {
    formSettings: {
      formName: formName,
      submitButtonText: 'Apply Filters',
      clearFormButtonText: 'Reset filters',
      showClearFormButton: true,
      clearFormAfterSubmit: false,
      submitAfterClear: true
    },
    generalClassNames: {
      clearFormButton: ['btn', 'btn-outline-gray-medium'],
      submitButton: ['btn', 'btn-primary', 'cwf-form-submit-button']
    },
    fields: []
  };
  queryParamsObjects.forEach(item => {
    if (!item.filtersForm) {
      return;
    }
    var field = {
      fieldId: item.key,
      defaultValue: item.defaultValue
    };
    for (var key in item.filtersForm) {
      field[key] = item.filtersForm[key];
    }
    formSchema.fields.push(field);
  });
  return formSchema;
}

export { formSchemaFromQueryParams as default };
//# sourceMappingURL=form-schema-from-query-params.js.map
