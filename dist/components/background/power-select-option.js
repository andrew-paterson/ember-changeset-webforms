import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<span class=\"power-select-item {{sanitise-classname @optionName}}\">\n  {{@optionName}}\n</span>");

const PowerSelectOption = templateOnly();
var powerSelectOption = setComponentTemplate(TEMPLATE, PowerSelectOption);

export { powerSelectOption as default };
//# sourceMappingURL=power-select-option.js.map
