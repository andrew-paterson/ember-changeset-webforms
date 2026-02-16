export default function isObject(val) {
  return val !== null && val !== undefined && typeof val === 'object';
}
