import { tracked } from '@glimmer/tracking';
import { g, i } from 'decorator-transforms/runtime';

class Option {
  static {
    g(this.prototype, "value", [tracked]);
  }
  #value = (i(this, "value"), undefined);
  static {
    g(this.prototype, "onlyCheckedOption", [tracked], function () {
      return false;
    });
  }
  #onlyCheckedOption = (i(this, "onlyCheckedOption"), undefined);
  static {
    g(this.prototype, "checked", [tracked], function () {
      return false;
    });
  }
  #checked = (i(this, "checked"), undefined);
  constructor(args) {
    for (const key in args) {
      this[key] = args[key];
    }
  }
}

export { Option as default };
//# sourceMappingURL=option-class.js.map
