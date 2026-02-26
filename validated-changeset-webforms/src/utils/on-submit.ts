import preFlightForm from './preflight-form.js';
import ChangesetWebform from './changeset-webform-class.js';
import { CwfCallbacks, SubmitCallbacks, ValidationCallbacks } from './types.js';

export default async function onSubmit(
  changesetWebform: InstanceType<typeof ChangesetWebform>,
  // callbacks: SubmitCallbacks & ValidationCallbacks,
) {
  console.log('onSubmit called with changesetWebform:', changesetWebform);
  // const callbacksKeys = Object.keys(callbacks);
  // console.log('onSubmit called with callbacks keys:', callbacksKeys);
  // console.log(callbacksKeys);
  const callbacks: CwfCallbacks = changesetWebform.callbacks;
  console.log('callbacks', callbacks);
  // console.log('callbacks2', callbacks2);
  await preFlightForm(changesetWebform);
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
    if (callbacks.submitData) {
      submitActionResponse = await callbacks.submitData(
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
