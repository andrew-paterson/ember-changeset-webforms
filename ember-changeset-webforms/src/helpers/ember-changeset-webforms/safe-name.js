import { helper } from '@ember/component/helper';
import { safeName } from 'validated-changeset-webforms';

export default helper(function safeNameUtil(params) {
  return safeName(params[0]);
});
