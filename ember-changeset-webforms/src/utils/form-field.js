import _FormField from 'validated-changeset-webforms/ui/form-field';
import { tracked } from '@glimmer/tracking';
import { TrackedArray } from 'tracked-built-ins';

export default class FormField extends _FormField {
  @tracked cloneCountStatus;
  @tracked clonedFields = TrackedArray.from([]);
  @tracked eventLog = TrackedArray.from([]);
  @tracked focussed;
  @tracked changeset;
  @tracked validatesOn = [];
  @tracked isOmitted = false;
  // BEGIN-SNIPPET field-settings-tracked-props.js
  // @tracked omitted;
  @tracked disabled;
  @tracked hideValidation;
  // END-SNIPPET
}
