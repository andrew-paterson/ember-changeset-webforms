import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if @extra.fieldValue.length}}\n  <div\n    class=\"ember-power-select-selected-item selected-items\"\n    data-test-class=\"power-select-checkboxes-selected-items\"\n  >\n    <span class=\"selected-items-count\">{{@extra.fieldValue.length}}</span>\n    selected\n  </div>\n{{else}}\n  <div class=\"ember-power-select-placeholder\">\n    {{@placeholder}}\n  </div>\n{{/if}}\n<span class=\"ember-power-select-status-icon\"></span>");

const PowerSelectCheckboxesTrigger = templateOnly();
var PowerSelectCheckboxesTriggerComponent = setComponentTemplate(TEMPLATE, PowerSelectCheckboxesTrigger);

export { PowerSelectCheckboxesTriggerComponent as default };
//# sourceMappingURL=power-select-checkboxes-trigger.js.map
