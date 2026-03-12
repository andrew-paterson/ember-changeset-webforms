import { Option as Option$1 } from 'validated-changeset-webforms';
import { tracked } from '@glimmer/tracking';
import { g, i } from 'decorator-transforms/runtime';

class Option extends Option$1 {
  static {
    g(this.prototype, "value", [tracked]);
  }
  #value = (i(this, "value"), void 0);
  static {
    g(this.prototype, "onlyCheckedOption", [tracked], function () {
      return false;
    });
  }
  #onlyCheckedOption = (i(this, "onlyCheckedOption"), void 0);
  static {
    g(this.prototype, "checked", [tracked], function () {
      return false;
    });
  }
  #checked = (i(this, "checked"), void 0);
}

export { Option as default };
//# sourceMappingURL=option-class.js.map
