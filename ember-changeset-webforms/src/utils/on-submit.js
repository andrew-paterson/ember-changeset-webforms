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
      submitActionResponse = await componentArgs.submitAction(
        savedChangeset.data,
        changesetWebform,
      );
    }
    changesetWebform.formSettings.requestInFlight = false;
    if (changesetWebform.formSettings.clearFormAfterSubmit) {
      changesetWebform.clear();
    }
    if (componentArgs.submitSuccess) {
      componentArgs.submitSuccess(submitActionResponse, changesetWebform);
    }
    return submitActionResponse;
  } catch (err) {
    changesetWebform.formSettings.requestInFlight = false;
    if (componentArgs.submitError) {
      componentArgs.submitError(err, changesetWebform);
    }
    return err;
  }
}
