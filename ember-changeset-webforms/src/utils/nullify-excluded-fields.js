export default function nullifyExcludedFields(changesetWebform) {
  var notAllowedKeys = changesetWebform.fields
    .filter((field) => {
      return field.dynamicallyOmitted || field.omitted || field.castOut;
    })
    .map((field) => field.propertyName);
  notAllowedKeys.forEach((path) => {
    if (changesetWebform.changeset.get(path) !== undefined) {
      changesetWebform.changeset.set(path, null);
    }
  });
}
