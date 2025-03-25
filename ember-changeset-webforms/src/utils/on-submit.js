import nullifyExcludedFields from '../utils/nullify-excluded-fields.js';
import isPromise from '../utils/is-promise.js';

export default function onSubmit(changesetWebform, componentArgs) {
  const changeset = changesetWebform.changeset;
  changesetWebform.fields.forEach((field) => {
    field.eventLog.push('submit');
    if (field.clonedFields) {
      field.clonedFields.forEach((clonedField, index) => {
        if (clonedField.validationRules && clonedField.validationRules.length) {
          clonedField.validationRules[0].activateValidation =
            clonedField.validationRules[0].activateValidation || [];
          clonedField.validationRules[0].activateValidation.push(index);
        }
        clonedField.eventLog.push('submit');
      });
      // TODO test for cloned fields without any validation rules
    }
  });
  changesetWebform
    .validateFields()
    .then((validationResult) => {
      if (componentArgs.afterValidateFields) {
        componentArgs.afterValidateFields(changesetWebform, validationResult);
      }
      if (changeset.isValid) {
        if (componentArgs.formValidationPassed) {
          componentArgs.formValidationPassed(changesetWebform);
        }
        try {
          if (componentArgs.beforeSubmitAction) {
            componentArgs.beforeSubmitAction(changesetWebform); // TODO how to make this await or not.
          }
        } catch (err) {
          console.log(err);
        }
        try {
          nullifyExcludedFields(changesetWebform); // TODO test this
        } catch (err) {
          console.log(err);
        }
        changesetWebform.formSettings.requestInFlight = true;
        if (componentArgs.submitAction) {
          changeset
            .save()
            .then((savedChangeset) => {
              try {
                var submitAction = componentArgs.submitAction(
                  savedChangeset.data,
                  changesetWebform,
                );
                if (isPromise(submitAction)) {
                  submitAction
                    .then((submitActionResponse) => {
                      changesetWebform.formSettings.requestInFlight = false;
                      if (componentArgs.submitSuccess) {
                        componentArgs.submitSuccess(
                          submitActionResponse,
                          changesetWebform,
                        );
                      }
                      if (changesetWebform.formSettings.clearFormAfterSubmit) {
                        this.clearForm(changesetWebform);
                      }
                    })
                    .catch((error) => {
                      changesetWebform.formSettings.requestInFlight = false;
                      if (componentArgs.submitError) {
                        componentArgs.submitError(error, changesetWebform);
                      }
                    });
                } else {
                  changesetWebform.formSettings.requestInFlight = false;
                  var submitActionResponse = submitAction;
                  if (componentArgs.submitSuccess) {
                    componentArgs.submitSuccess(
                      submitActionResponse,
                      changesetWebform,
                    );
                  }
                  if (changesetWebform.formSettings.clearFormAfterSubmit) {
                    this.clearForm(changesetWebform);
                  }
                }
              } catch (error) {
                changesetWebform.formSettings.requestInFlight = false;
                if (componentArgs.submitError) {
                  componentArgs.submitError(error, changesetWebform);
                }
              }
            })
            .catch((err) => {
              changesetWebform.formSettings.requestInFlight = false;
              if (componentArgs.submitError) {
                componentArgs.submitError(err, changesetWebform);
              }
            });
        } else {
          changeset
            .save()
            .then((saveChangesetResponse) => {
              changesetWebform.formSettings.requestInFlight = false;
              if (componentArgs.submitSuccess) {
                componentArgs.submitSuccess(
                  saveChangesetResponse,
                  changesetWebform,
                );
              }
              if (changesetWebform.formSettings.clearFormAfterSubmit) {
                this.clearForm(changesetWebform);
              }
            })
            .catch((error) => {
              if (componentArgs.submitError) {
                componentArgs.submitError(error, changesetWebform);
              }
              changesetWebform.formSettings.requestInFlight = false;
            });
        }
      } else {
        if (componentArgs.formValidationFailed) {
          componentArgs.formValidationFailed(changesetWebform);
        }
      }
    })
    .catch((err) => {
      changesetWebform.formSettings.requestInFlight = false;
      if (componentArgs.formValidationFailed) {
        componentArgs.formValidationFailed(changesetWebform, err);
      }
    });
}
