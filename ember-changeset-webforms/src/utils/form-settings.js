import _FormSettings from 'validated-changeset-webforms/dist/ui/form-settings';
import { tracked } from '@glimmer/tracking';

export default class FormSettings extends _FormSettings {
  // BEGIN-SNIPPET form-settings-tracked-props.js
  @tracked hideSubmitButton;
  @tracked submitButtonText;
  @tracked requestInFlightIcon;
  @tracked clearFormButton;
  @tracked clearFormButtonText;
  @tracked resetFormButton;
  @tracked resetFormButtonText;
  @tracked requestInFlight;
  // END-SNIPPET
}
