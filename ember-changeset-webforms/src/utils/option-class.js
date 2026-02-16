import _Option from 'validated-changeset-webforms/dist/utils/option-class';
import { tracked } from '@glimmer/tracking';

export default class Option extends _Option {
  @tracked value;
  @tracked onlyCheckedOption = false;
  @tracked checked = false;
}
