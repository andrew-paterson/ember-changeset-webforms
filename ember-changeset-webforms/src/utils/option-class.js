import { Option as _Option } from 'validated-changeset-webforms';
import { tracked } from '@glimmer/tracking';

export default class Option extends _Option {
  @tracked value;
  @tracked onlyCheckedOption = false;
  @tracked checked = false;
}
