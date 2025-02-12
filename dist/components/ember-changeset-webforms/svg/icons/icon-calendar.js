import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<svg\n  xmlns=\"http://www.w3.org/2000/svg\"\n  viewBox=\"0 0 218.8 250\"\n  class=\"single-colour icon-calendar\"\n  data-test-icon=\"icon-calendar\"\n  ...attributes\n><path\n    d=\"M218.8 226.6A23.3 23.3 0 0 1 195.3 250H23.4a22.6 22.6 0 0 1-16.6-6.8A22.6 22.6 0 0 1 0 226.6V54.7a22.6 22.6 0 0 1 6.8-16.6 22.6 22.6 0 0 1 16.6-6.8H46.9V5.9a5.7 5.7 0 0 1 1.7-4.1A5.7 5.7 0 0 1 52.7 0H72.3a5.7 5.7 0 0 1 4.2 1.7 5.7 5.7 0 0 1 1.7 4.2V31.3h62.5V5.9a5.7 5.7 0 0 1 1.7-4.1A5.7 5.7 0 0 1 146.5 0H166a5.7 5.7 0 0 1 4.2 1.7 5.7 5.7 0 0 1 1.7 4.2V31.3h23.4a23.3 23.3 0 0 1 23.4 23.4ZM195.3 78.1H23.4V223.6a2.8 2.8 0 0 0 1 2 2.8 2.8 0 0 0 2 1h166a3.5 3.5 0 0 0 2.9-2.9ZM52.7 140.6a5.8 5.8 0 0 1-5.9-5.9V115.2a5.8 5.8 0 0 1 5.9-5.9H72.3a5.8 5.8 0 0 1 5.9 5.9v19.5a5.8 5.8 0 0 1-5.9 5.9Zm25.4 21.5a5.8 5.8 0 0 0-5.9-5.9H52.7a5.8 5.8 0 0 0-5.9 5.9v19.5a5.8 5.8 0 0 0 5.9 5.9H72.3a5.8 5.8 0 0 0 5.9-5.9ZM125 115.2a5.8 5.8 0 0 0-5.9-5.9H99.6a5.8 5.8 0 0 0-5.9 5.9v19.5a5.8 5.8 0 0 0 5.9 5.9h19.5a5.8 5.8 0 0 0 5.9-5.9Zm0 46.9a5.8 5.8 0 0 0-5.9-5.9H99.6a5.8 5.8 0 0 0-5.9 5.9v19.5a5.8 5.8 0 0 0 5.9 5.9h19.5a5.8 5.8 0 0 0 5.9-5.9Zm46.9-46.9a5.8 5.8 0 0 0-5.9-5.9H146.5a5.8 5.8 0 0 0-5.9 5.9v19.5a5.8 5.8 0 0 0 5.9 5.9H166a5.8 5.8 0 0 0 5.9-5.9Zm0 46.9a5.8 5.8 0 0 0-5.9-5.9H146.5a5.8 5.8 0 0 0-5.9 5.9v19.5a5.8 5.8 0 0 0 5.9 5.9H166a5.8 5.8 0 0 0 5.9-5.9Z\"\n  /></svg>");

const IconCalendar = templateOnly();
var iconCalendar = setComponentTemplate(TEMPLATE, IconCalendar);

export { iconCalendar as default };
//# sourceMappingURL=icon-calendar.js.map
