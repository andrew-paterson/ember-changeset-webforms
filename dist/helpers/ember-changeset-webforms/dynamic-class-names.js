import { helper } from '@ember/component/helper';
import dynamicClassNames$1 from '../../utils/dynamic-class-names.js';

var dynamicClassNames = helper(function dynamicClasses(params) {
  return dynamicClassNames$1(params[0], params[1], params[2]);
});

// TODO doc the gotcha that dynamic classes helper must include formField

export { dynamicClassNames as default };
//# sourceMappingURL=dynamic-class-names.js.map
