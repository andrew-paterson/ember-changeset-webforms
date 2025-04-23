import preFlightForm from '../utils/preflight-form.js';

export default async function onSubmit(changesetWebform, componentArgs) {
  await preFlightForm(changesetWebform, componentArgs);
  if (!changesetWebform.changeset.isValid) {
    throw new Error('Validation failed');
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
    if (componentArgs.submitSuccess) {
      await componentArgs.submitSuccess(submitActionResponse, changesetWebform);
    }
  } catch (err) {
    changesetWebform.formSettings.requestInFlight = false;
    if (componentArgs.submitError) {
      await componentArgs.submitError(err, changesetWebform);
    }
    throw new Error(err);
  }
}
