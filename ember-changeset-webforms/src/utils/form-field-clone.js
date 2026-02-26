import _FormFieldClone from 'validated-changeset-webforms/dist/ui/form-field-clone';
import { tracked } from '@glimmer/tracking';
import { TrackedArray } from 'tracked-built-ins';

export default class FormFieldClone extends _FormFieldClone {
  @tracked index;
  @tracked id;
  @tracked eventLog;
  @tracked focussed;
  @tracked changeset;
  @tracked validatesOn = [];
  @tracked fieldLabel;

  // BEGIN-SNIPPET cloned-field-settings-tracked-props.js
  @tracked omittedExplicitly;
  @tracked disabled;
  @tracked externalProps;
  // END-SNIPPET

  constructor(args) {
    super(args);
    this.eventLog = TrackedArray.from([]);
  }
}
