import { helper } from '@ember/component/helper';
import _setCustomValidity from 'validated-changeset-webforms/dist/utils/set-custom-validity.js';

export default helper(function setCustomValidity(params) {
  return _setCustomValidity(params[0], params[1], params[2]);
});
