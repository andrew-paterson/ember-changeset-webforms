import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if @timeFormatPart}}\n  <div\n    data-test-class=\"time-selector-field\"\n    data-test-id=\"time-selector-field-{{@timeFormatPart.type}}\"\n    class=\"time-selector-field time-selector-field-{{@timeFormatPart.type}}\"\n  >\n    <label\n      for=\"time-selector-{{@timeFormatPart.type}}\"\n      data-test-class=\"time-selector-field-label\"\n      data-test-id=\"time-selector-field-label-{{@timeFormatPart.type}}\"\n      class={{@timeInputLabelClass}}\n    >{{@timeFormatPart.label}}</label>\n    <input\n      id=\"time-selector-{{@timeFormatPart.type}}\"\n      data-test-class=\"time-selector-field-input\"\n      data-test-id=\"time-selector-field-input-{{@timeFormatPart.type}}\"\n      type=\"number\"\n      max={{@timeFormatPart.max}}\n      min={{@timeFormatPart.min}}\n      value={{readonly\n        (if\n          @value\n          (ember-changeset-webforms/moment-format\n            (ember-changeset-webforms/moment @value @dateTimeFormat)\n            @timeFormatPart.formatChar\n          )\n        )\n      }}\n      {{on \"keyup\" (fn @keyupAction @timeFormatPart.formatChar)}}\n      {{on \"keydown\" (fn @keydownAction @timeFormatPart.formatChar)}}\n      {{on \"change\" (fn @changeAction @timeFormatPart.formatChar)}}\n      class=\"time-selector-field-input-{{@timeFormatPart.type}}\n        {{@timeInputClass}}\"\n    />\n  </div>\n{{/if}}");

const TimePartInput = templateOnly();
var timePartInput = setComponentTemplate(TEMPLATE, TimePartInput);

export { timePartInput as default };
//# sourceMappingURL=time-part-input.js.map
