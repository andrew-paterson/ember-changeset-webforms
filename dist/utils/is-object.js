import { typeOf } from '@ember/utils';

function isObject(val) {
  return typeof val === 'object' || typeOf(val) === 'instance';
}

export { isObject as default };
//# sourceMappingURL=is-object.js.map
