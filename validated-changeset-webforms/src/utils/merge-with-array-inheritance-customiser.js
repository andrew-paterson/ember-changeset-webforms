export default function (
  objValue,
  srcValue,
  keyName,
  _parentObjValue,
  parentSrcValue,
) {
  if (keyName === 'customParser') {
    if (!parentSrcValue.fieldType) {
      return srcValue;
    }
    parentSrcValue.customParsers = parentSrcValue.customParsers || [];
    if (objValue && !parentSrcValue.customParsers.includes(objValue)) {
      parentSrcValue.customParsers.push(objValue);
    }
    if (!parentSrcValue.customParsers.includes(srcValue)) {
      parentSrcValue.customParsers.push(srcValue);
    }
    return srcValue;
  }
  if (Array.isArray(objValue) && Array.isArray(srcValue)) {
    if (srcValue.indexOf('$inherited') > -1) {
      return objValue.concat(srcValue).filter((item) => item !== '$inherited');
    } else {
      return srcValue;
    }
  }
}
