import { helper } from '@ember/component/helper';
import { setCustomValidity as _setCustomValidity } from 'validated-changeset-webforms';

export default helper(function setCustomValidity(params) {
  return _setCustomValidity(params[0], params[1], params[2]);
});
