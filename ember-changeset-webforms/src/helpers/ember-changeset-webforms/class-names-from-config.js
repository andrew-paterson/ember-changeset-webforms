import { helper } from '@ember/component/helper';
import { classNamesFromConfig } from 'validated-changeset-webforms';

export default helper(function dynamicClasses(params) {
  const [names, changesetWebform, formField] = params;
  return classNamesFromConfig(names, changesetWebform, formField).join(' ');
});

// TODO doc the gotcha that dynamic classes helper must include formField
