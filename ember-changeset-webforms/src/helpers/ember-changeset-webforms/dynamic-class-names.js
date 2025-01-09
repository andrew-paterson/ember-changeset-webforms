import { helper } from '@ember/component/helper';
import dynamicClassNames from '../../utils/dynamic-class-names';

export default helper(function dynamicClasses(params) {
  return dynamicClassNames(params[0], params[1], params[2]);
});

// TODO doc the gotcha that dynamic classes helper must include formField
