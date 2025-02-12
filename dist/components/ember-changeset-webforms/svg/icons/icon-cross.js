import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div ...attributes>\n  {{yield}}\n</div>");

const IconCross = templateOnly();
var iconCross = setComponentTemplate(TEMPLATE, IconCross);

export { iconCross as default };
//# sourceMappingURL=icon-cross.js.map
