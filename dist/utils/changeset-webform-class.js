import { tracked } from '@glimmer/tracking';
import { ChangesetWebform as ChangesetWebform$1 } from 'validated-changeset-webforms';
import { g, i } from 'decorator-transforms/runtime';

class ChangesetWebform extends ChangesetWebform$1 {
  static {
    g(this.prototype, "changeset", [tracked]);
  }
  #changeset = (i(this, "changeset"), void 0);
  static {
    g(this.prototype, "fields", [tracked]);
  }
  #fields = (i(this, "fields"), void 0);
}

export { ChangesetWebform as default };
//# sourceMappingURL=changeset-webform-class.js.map
