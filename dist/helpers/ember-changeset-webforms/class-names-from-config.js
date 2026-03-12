import { helper } from '@ember/component/helper';
import { classNamesFromConfig as classNamesFromConfig$1 } from 'validated-changeset-webforms';

var classNamesFromConfig = helper(function dynamicClasses(params) {
  const [names, changesetWebform, formField] = params;
  return classNamesFromConfig$1(names, changesetWebform, formField).join(' ');
});

// TODO doc the gotcha that dynamic classes helper must include formField

export { classNamesFromConfig as default };
//# sourceMappingURL=class-names-from-config.js.map
