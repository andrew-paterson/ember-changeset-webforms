import preFlightForm from '../utils/preflight-form.js';

export default async function onSubmit(changesetWebform, componentArgs) {
  await preFlightForm(changesetWebform, componentArgs);
  if (!changesetWebform.changeset.isValid) {
    return;
  }
  if (componentArgs.beforeSubmitForm) {
    await componentArgs.beforeSubmitForm(changesetWebform);
  }
  changesetWebform.formSettings.requestInFlight = true;
  let submitActionResponse;
  try {
    const savedChangeset = await changesetWebform.changeset.save();
    submitActionResponse = savedChangeset;
    if (componentArgs.submitAction) {
      const submitAction = componentArgs.submitAction(
        savedChangeset.data,
        changesetWebform,
      );
      submitActionResponse = await submitAction;
    }
    changesetWebform.formSettings.requestInFlight = false;
    if (componentArgs.submitSuccess) {
      componentArgs.submitSuccess(submitActionResponse, changesetWebform);
    }
    if (changesetWebform.formSettings.clearFormAfterSubmit) {
      componentArgs.clearForm(changesetWebform);
    }
  } catch (err) {
    changesetWebform.formSettings.requestInFlight = false;
    if (componentArgs.submitError) {
      componentArgs.submitError(err, changesetWebform);
    }
  }
}
