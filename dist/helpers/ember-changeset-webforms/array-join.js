import { helper } from '@ember/component/helper';

function arrayJoin(params /*, hash*/) {
  if (!params[0]) {
    return;
  }
  if (!Array.isArray(params[0])) {
    console.warn(`[ember-changeset-webforms/array-join] You must pass an array as the first argument, You passed ${params[0]}] `);
    return params[0];
  }
  return params[0].join(params[1]);
}
var arrayJoin$1 = helper(arrayJoin);

export { arrayJoin, arrayJoin$1 as default };
//# sourceMappingURL=array-join.js.map
