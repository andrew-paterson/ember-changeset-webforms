export default function validateAllowedFields(changesetWebform) {
  var allowedFields = changesetWebform.fields.filter((field) => {
    return (
      !field.omitted &&
      !field.dynamicallyOmitted &&
      !field.skipValidation &&
      field.validates
    );
  });
  const allowedFieldPropertyNames = allowedFields.map(
    (allowedField) => allowedField.propertyName,
  );

  var validatePromises = allowedFieldPropertyNames.map((allowedField) => {
    return changesetWebform.changeset.validate(allowedField);
  });
  return Promise.all(validatePromises);
}
