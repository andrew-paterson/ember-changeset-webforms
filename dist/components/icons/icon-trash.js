import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<svg\n  xmlns=\"http://www.w3.org/2000/svg\"\n  viewBox=\"0 0 29.9 33.1\"\n  class=\"single-colour icon-trash\"\n  data-test-icon=\"icon-trash\"\n  ...attributes\n><path\n    d=\"M25.9 12.1H4c-0.7 0-1.3 0.2-1.3 1L4 31.8c0 0.7 0.6 1.3 1.3 1.3h19.2c0 0 0 0 0 0 0.7 0 1.3-0.6 1.3-1.3l1.3-18.6C27.2 12.4 26.6 12.1 25.9 12.1z\"\n  /><path\n    d=\"M27.9 5.2h-7.1c-0.8-2.9-3.6-4.8-6.6-4.3 -2.4 0.3-4.3 2.1-5 4.3H2c-1.1 0-2 0.9-2 2 0 1.1 0.9 2 2 2h25.9c1.1 0 2-0.9 2-2C29.9 6.1 29 5.2 27.9 5.2z\"\n  /></svg>");

const IconsIconTrashComponent = templateOnly();
var IconTrashComponent = setComponentTemplate(TEMPLATE, IconsIconTrashComponent);

export { IconTrashComponent as default };
//# sourceMappingURL=icon-trash.js.map
