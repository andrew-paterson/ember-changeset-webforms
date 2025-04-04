import nullifyExcludedFields from '../utils/nullify-excluded-fields.js';

export default async function preFlightForm(changesetWebform, componentArgs) {
  try {
    const changeset = changesetWebform.changeset;
    changesetWebform.fields.forEach((field) => {
      field.eventLog.push('submit');
      if (field.clonedFields) {
        field.clonedFields.forEach((clonedField, index) => {
          if (
            clonedField.validationRules &&
            clonedField.validationRules.length
          ) {
            clonedField.validationRules[0].activateValidation =
              clonedField.validationRules[0].activateValidation || [];
            clonedField.validationRules[0].activateValidation.push(index);
          }
          clonedField.eventLog.push('submit');
        });
        // TODO test for cloned fields without any validation rules
      }
    });
    const validationResult = await changesetWebform.validateFields();
    if (componentArgs.afterValidateFields) {
      await componentArgs.afterValidateFields(
        changesetWebform,
        validationResult,
      );
    }
    if (changeset.isValid) {
      if (componentArgs.formValidationPassed) {
        await componentArgs.formValidationPassed(changesetWebform);
      }
      if (componentArgs.beforeSubmitForm) {
        await componentArgs.beforeSubmitForm(changesetWebform); // TODO how to make this await or not.
      }
      nullifyExcludedFields(changesetWebform); // TODO test this
    } else {
      if (componentArgs.formValidationFailed) {
        await componentArgs.formValidationFailed(changesetWebform);
      }
    }
  } catch (err) {}
}
