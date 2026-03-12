import { FormSettings as FormSettings$1 } from 'validated-changeset-webforms';
import { tracked } from '@glimmer/tracking';
import { g, i } from 'decorator-transforms/runtime';

class FormSettings extends FormSettings$1 {
  static {
    g(this.prototype, "hideSubmitButton", [tracked]);
  }
  #hideSubmitButton = (i(this, "hideSubmitButton"), void 0); // BEGIN-SNIPPET form-settings-tracked-props.js
  static {
    g(this.prototype, "submitButtonText", [tracked]);
  }
  #submitButtonText = (i(this, "submitButtonText"), void 0);
  static {
    g(this.prototype, "requestInFlightIcon", [tracked]);
  }
  #requestInFlightIcon = (i(this, "requestInFlightIcon"), void 0);
  static {
    g(this.prototype, "clearFormButton", [tracked]);
  }
  #clearFormButton = (i(this, "clearFormButton"), void 0);
  static {
    g(this.prototype, "clearFormButtonText", [tracked]);
  }
  #clearFormButtonText = (i(this, "clearFormButtonText"), void 0);
  static {
    g(this.prototype, "resetFormButton", [tracked]);
  }
  #resetFormButton = (i(this, "resetFormButton"), void 0);
  static {
    g(this.prototype, "resetFormButtonText", [tracked]);
  }
  #resetFormButtonText = (i(this, "resetFormButtonText"), void 0);
  static {
    g(this.prototype, "requestInFlight", [tracked]);
  }
  #requestInFlight = (i(this, "requestInFlight"), void 0); // END-SNIPPET
}

export { FormSettings as default };
//# sourceMappingURL=form-settings.js.map
