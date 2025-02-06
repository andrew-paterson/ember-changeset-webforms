import { tracked } from '@glimmer/tracking';
import { g, i } from 'decorator-transforms/runtime';

class FormSettings {
  static {
    g(this.prototype, "hideSubmitButton", [tracked]);
  }
  #hideSubmitButton = (i(this, "hideSubmitButton"), undefined); // BEGIN-SNIPPET form-settings-tracked-props.js
  static {
    g(this.prototype, "submitButtonText", [tracked]);
  }
  #submitButtonText = (i(this, "submitButtonText"), undefined);
  static {
    g(this.prototype, "submitButtonIconComponent", [tracked]);
  }
  #submitButtonIconComponent = (i(this, "submitButtonIconComponent"), undefined);
  static {
    g(this.prototype, "showClearFormButton", [tracked]);
  }
  #showClearFormButton = (i(this, "showClearFormButton"), undefined);
  static {
    g(this.prototype, "clearFormButtonText", [tracked]);
  }
  #clearFormButtonText = (i(this, "clearFormButtonText"), undefined);
  static {
    g(this.prototype, "showRollbackChangesetButton", [tracked]);
  }
  #showRollbackChangesetButton = (i(this, "showRollbackChangesetButton"), undefined);
  static {
    g(this.prototype, "showRollbackChangesetButtonText", [tracked]);
  }
  #showRollbackChangesetButtonText = (i(this, "showRollbackChangesetButtonText"), undefined);
  static {
    g(this.prototype, "requestInFlight", [tracked]);
  }
  #requestInFlight = (i(this, "requestInFlight"), undefined);
  // END-SNIPPET
  constructor(args) {
    for (const key in args) {
      this[key] = args[key];
    }
  }
}

export { FormSettings as default };
//# sourceMappingURL=form-settings.js.map
