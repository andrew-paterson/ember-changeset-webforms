import preFlightForm from './preflight-form.js';
import ChangesetWebform from './changeset-webform-class.js';
import { SubmitCallbacks, ValidationCallbacks } from './types.js';

export default async function onSubmit(
  changesetWebform: InstanceType<typeof ChangesetWebform>,
  callbacks: SubmitCallbacks & ValidationCallbacks,
) {
  await preFlightForm(changesetWebform, callbacks);
  if (!changesetWebform.changeset.isValid) {
    return;
  }
  if (callbacks.beforeSubmitForm) {
    await callbacks.beforeSubmitForm(changesetWebform);
  }
  changesetWebform.formSettings.requestInFlight = true;
  let submitActionResponse;
  try {
    const savedChangeset = await changesetWebform.changeset.save();
    submitActionResponse = savedChangeset;
    if (callbacks.submitAction) {
      submitActionResponse = await callbacks.submitAction(
        savedChangeset.data,
        changesetWebform,
      );
    }
    changesetWebform.formSettings.requestInFlight = false;
    if (changesetWebform.formSettings.clearFormAfterSubmit) {
      changesetWebform.clear();
    }

    if (callbacks.submitSuccess) {
      callbacks.submitSuccess(submitActionResponse, changesetWebform);
    }
    if (callbacks.submitComplete) {
      callbacks.submitComplete(
        'success',
        submitActionResponse,
        changesetWebform,
      );
    }
    return submitActionResponse;
  } catch (err) {
    changesetWebform.formSettings.requestInFlight = false;
    if (callbacks.submitError) {
      callbacks.submitError(err, changesetWebform);
    }
    if (callbacks.submitComplete) {
      callbacks.submitComplete('error', err, changesetWebform);
    }
    return err;
  }
}
