import { helper } from '@ember/component/helper';
import dynamicClassNames from '../../utils/dynamic-class-names';

export default helper(function dynamicClasses(params) {
  console.log(params[0]);
  console.log(params[1]);
  console.log(params[2]);

  console.log(dynamicClassNames(params[0], params[1], params[2]));
  return dynamicClassNames(params[0], params[1], params[2]);
});

// TODO doc the gotcha that dynamic classes helper must include formField
