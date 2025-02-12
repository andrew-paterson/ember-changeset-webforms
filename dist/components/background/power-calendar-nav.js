import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<nav class=\"ember-power-calendar-nav\" ...attributes>\n  <button\n    type=\"button\"\n    class=\"ember-power-calendar-nav-control\"\n    {{on \"click\" (fn @moveCenter -12 \"month\")}}\n  >«</button>\n  <button\n    type=\"button\"\n    class=\"ember-power-calendar-nav-control\"\n    {{on \"click\" (fn @moveCenter -1 \"month\")}}\n  >‹</button>\n  <div class=\"ember-power-calendar-nav-title\">\n    {{moment-format @calendar.center @calendarTitleFormat}}\n  </div>\n  <button\n    type=\"button\"\n    class=\"ember-power-calendar-nav-control\"\n    {{on \"click\" (fn @moveCenter 1 \"month\")}}\n  >›</button>\n  <button\n    type=\"button\"\n    class=\"ember-power-calendar-nav-control\"\n    {{on \"click\" (fn @moveCenter 12 \"month\")}}\n  >»</button>\n</nav>");

const PowerCalendarNav = templateOnly();
var powerCalendarNav = setComponentTemplate(TEMPLATE, PowerCalendarNav);

export { powerCalendarNav as default };
//# sourceMappingURL=power-calendar-nav.js.map
