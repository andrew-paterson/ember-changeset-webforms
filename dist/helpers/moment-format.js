import { helper } from '@ember/component/helper';
import moment from 'moment';

var momentFormat = helper(function momentFormat(positional) {
  return moment(positional[0]).format(positional[1]);
});

export { momentFormat as default };
//# sourceMappingURL=moment-format.js.map
