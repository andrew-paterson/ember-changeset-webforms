import FormField from './form-field.js';
import { typeOf as emberTypeOf } from '@ember/utils';
import Option from './option-class.js';
import safeName from './safe-name.js';

export default function parseChangesetWebformField(fieldSchema, formName) {
  if (!fieldSchema) {
    return;
  }
  if (!fieldSchema.fieldId) {
    throw Error(
      `[Ember validating field] fieldId is a required field for each field in a validating form.`,
    );
  }
  if (!fieldSchema.fieldLabel) {
    console.warn(
      `[Ember validating field - ${fieldSchema.fieldId}] fieldLabel should be included for each field in a validating form. You can set hideLabel to true if you want to hide the label.`,
    );
  }
  const parsedField = parse(fieldSchema, formName);
  return new FormField(parsedField);
}

function isPrimitive(value) {
  return (
    value === null || (typeof value !== 'object' && typeof value !== 'function')
  );
}

function parse(fieldSchema, formName) {
  let field = { ...fieldSchema };
  field.fieldSchema = fieldSchema;
  if (field.cloneFieldSchema) {
    field.cloneGroupName = field.fieldId;
    field.cloneGroupNumber = 0;
    field.cloneFieldSchema.fieldId = field.fieldId;
    field.clonedFieldBlueprint = parse(field.cloneFieldSchema, formName);
  }

  if (field.options) {
    field.options = field.options.map(function (option) {
      if (field.fieldType === 'radioButtonGroup' && isPrimitive(option)) {
        option = { label: option, value: option };
      }
      if (field.fieldType === 'checkboxGroup' && isPrimitive(option)) {
        option = { label: option, key: option };
      }
      if (emberTypeOf(option) === 'object') {
        return new Option(option);
      }
      return option;
    });
  }

  if ((field.cloneFieldSchema || {}).validationRules) {
    field.clonedFieldBlueprint.validatesOn.forEach((event) => {
      const skip = ['submit', 'removeClone'];
      if (skip.indexOf(event) > -1) {
        return;
      }
      if (
        !field.validatesOn.find((fieldEvent) => fieldEvent === `${event}Clone`)
      ) {
        field.validatesOn.push(`${event}Clone`);
      }
    });
  }

  field.name =
    field.name || safeName(`${formName}-form-${field.fieldId}-field`);
  field.id = field.id || safeName(`${formName}-form-${field.fieldId}-field`);
  field.placeholder = field.placeholder || field.fieldLabel;
  field.propertyName = field.propertyName || field.fieldId;
  // field.customParsers array is created in mergeWithArrayInheritanceCustomiser function for lodash.mergeWith. It simply stascks each customParser function in order.
  if (field.customParsers) {
    field.customParsers.forEach((customParser) => {
      field = customParser(field);
    });
  }
  field.validatesOn = ['forceValidation']
    .concat(field.validatesOn || [])
    .concat(field.alwaysValidateOn || []);
  delete field.alwaysValidateOn;
  delete field.cloneFieldSchema;
  return field;
}
