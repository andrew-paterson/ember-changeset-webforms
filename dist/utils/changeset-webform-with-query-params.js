import _mergeWith from 'lodash.mergewith';
import { mergeWithArrayInheritanceCustomiser } from 'validated-changeset-webforms';

function createFormSchema(queryParamsObjects, formName, merge) {
  var formSchema = {
    formSettings: {
      formName: formName
    },
    fields: []
  };
  queryParamsObjects.forEach(item => {
    if (!item.ecwFieldSchema) {
      return;
    }
    var field = {
      fieldId: item.paramName
    };
    if (item.defaultValue !== undefined) {
      field.defaultValue = item.defaultValue;
    }
    for (var paramName in item.ecwFieldSchema) {
      field[paramName] = item.ecwFieldSchema[paramName];
    }
    formSchema.fields.push(field);
  });
  return _mergeWith({}, formSchema, merge, mergeWithArrayInheritanceCustomiser);
}
function setQueryParamsWithDefaults(controller, queryParamsObjects) {
  if (queryParamsObjects) {
    const qps = [...new Set((controller.queryParams || []).concat(queryParamsObjects.map(item => {
      return item.paramName;
    }) || []))];
    controller.queryParams = qps;
    queryParamsObjects.forEach(qpObject => {
      if (!qpObject.defaultValue) {
        return;
      }
      if (Array.isArray(qpObject.defaultValue)) {
        qpObject.defaultValue = qpObject.defaultValue.join(',');
      }
      const propName = qpObject.paramName;
      controller[propName] = qpObject.defaultValue;
    });
  }
}
function formDataFromUrlParams(controller, queryParamsObjects) {
  const final = {};
  queryParamsObjects.forEach(item => {
    if (!item.ecwFieldSchema) {
      return;
    }
    const propName = item.paramName;
    if (item.fieldValueFromUrlParamFunc) {
      final[propName] = item.fieldValueFromUrlParamFunc(item, controller[propName]);
      return;
    }
    final[propName] = controller[propName];
  });
  return final;
}
function applyFormValues(controller, queryParamsObjects, formData) {
  for (var key in formData) {
    try {
      var value = formData[key];
      var thisObject = queryParamsObjects.find(queryParamsObject => queryParamsObject.paramName === key) || {};
      if (thisObject.applyValuesFunc) {
        value = thisObject.applyValuesFunc(value);
      }
      value = (value || []).length === 0 ? null : value;
      controller[key] = value;
    } catch (err) {
      console.error('Error applying form value for key', key, err);
    }
  }
}

export { applyFormValues, createFormSchema, formDataFromUrlParams, setQueryParamsWithDefaults };
//# sourceMappingURL=changeset-webform-with-query-params.js.map
