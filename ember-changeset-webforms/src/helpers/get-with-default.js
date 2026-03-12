import { helper } from '@ember/component/helper';
import getWithDefaultUtil from 'get-with-default/utils/get-with-default.js';

export function getWithDefault(params) {
  return getWithDefaultUtil(params);
}

export default helper(getWithDefault);
