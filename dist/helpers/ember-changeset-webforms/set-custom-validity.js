import { helper } from '@ember/component/helper';
import { setCustomValidity as setCustomValidity$1 } from 'validated-changeset-webforms';

var setCustomValidity = helper(function setCustomValidity(params) {
  return setCustomValidity$1(params[0], params[1], params[2]);
});

export { setCustomValidity as default };
//# sourceMappingURL=set-custom-validity.js.map
