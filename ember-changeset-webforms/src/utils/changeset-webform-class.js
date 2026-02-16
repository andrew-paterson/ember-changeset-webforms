import { tracked } from '@glimmer/tracking';
import _ChangesetWebform from 'validated-changeset-webforms/dist/utils/changeset-webform-class';

export default class ChangesetWebform extends _ChangesetWebform {
  @tracked changeset;
  @tracked fields;
}
