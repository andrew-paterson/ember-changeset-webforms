import { helper } from '@ember/component/helper';
import moment$1 from 'moment';

var moment = helper(function momentFormat(positional) {
  return moment$1(positional[0], positional[1]);
});

export { moment as default };
//# sourceMappingURL=moment.js.map
