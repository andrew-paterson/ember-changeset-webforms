function mergeWithDefaultClassNames (objValue, srcValue) {
  if (Array.isArray(objValue)) {
    if (srcValue.indexOf('$inherited') > -1) {
      return objValue.concat(srcValue).filter(className => !className.startsWith('.'));
    } else {
      return srcValue.filter(className => !className.startsWith('.'));
    }
  }
}

export { mergeWithDefaultClassNames as default };
//# sourceMappingURL=merge-with-default-class-names.js.map
