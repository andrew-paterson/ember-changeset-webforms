import { tracked } from '@glimmer/tracking';
import { ChangesetWebform as _ChangesetWebform } from 'validated-changeset-webforms';

export default class ChangesetWebform extends _ChangesetWebform {
  @tracked changeset;
  @tracked fields;
}
