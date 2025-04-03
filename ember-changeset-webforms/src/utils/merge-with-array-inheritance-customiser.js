export default function (objValue, srcValue) {
  if (Array.isArray(objValue)) {
    if (srcValue.indexOf('$inherited') > -1) {
      return objValue.concat(srcValue).filter((item) => item !== '$inherited');
    } else {
      return srcValue;
    }
  }
}
