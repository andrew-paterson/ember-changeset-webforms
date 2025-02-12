import isObject from './is-object.js';

function isPromiseLike(obj) {
  return !!obj && !!obj.then && !!obj.catch && !!obj.finally && typeof obj.then === 'function' && typeof obj.catch === 'function' && typeof obj.finally === 'function';
}
function isPromise(obj) {
  return isObject(obj) && isPromiseLike(obj);
}

export { isPromise as default };
//# sourceMappingURL=is-promise.js.map
