import { helper } from '@ember/component/helper';
import safeName from 'validated-changeset-webforms/dist/utils/safe-name.js';

export default helper(function safeNameUtil(params) {
  return safeName(params[0]);
});
