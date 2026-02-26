import { tracked } from '@glimmer/tracking';
import _ChangesetWebform from 'validated-changeset-webforms/changeset-webform';

export default class ChangesetWebform extends _ChangesetWebform {
  @tracked changeset;
  @tracked fields;
}
