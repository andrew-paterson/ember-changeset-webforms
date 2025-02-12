function mergeWithDefaults (objValue, srcValue, key) {
  if (Array.isArray(objValue) && key.endsWith('ClassNames')) {
    if (srcValue.indexOf('$inherited') > -1) {
      return objValue.concat(srcValue).filter(className => !className.startsWith('.'));
    } else {
      return srcValue.filter(className => !className.startsWith('.'));
    }
  }
}

export { mergeWithDefaults as default };
//# sourceMappingURL=merge-with-defaults.js.map
