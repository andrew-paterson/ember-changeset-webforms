import { FormField as FormField$1 } from 'validated-changeset-webforms';
import { tracked } from '@glimmer/tracking';
import { TrackedArray } from 'tracked-built-ins';
import { g, i } from 'decorator-transforms/runtime';

class FormField extends FormField$1 {
  static {
    g(this.prototype, "cloneCountStatus", [tracked]);
  }
  #cloneCountStatus = (i(this, "cloneCountStatus"), void 0);
  static {
    g(this.prototype, "clonedFields", [tracked], function () {
      return TrackedArray.from([]);
    });
  }
  #clonedFields = (i(this, "clonedFields"), void 0);
  static {
    g(this.prototype, "eventLog", [tracked], function () {
      return TrackedArray.from([]);
    });
  }
  #eventLog = (i(this, "eventLog"), void 0);
  static {
    g(this.prototype, "focussed", [tracked]);
  }
  #focussed = (i(this, "focussed"), void 0);
  static {
    g(this.prototype, "changeset", [tracked]);
  }
  #changeset = (i(this, "changeset"), void 0);
  static {
    g(this.prototype, "validatesOn", [tracked], function () {
      return [];
    });
  }
  #validatesOn = (i(this, "validatesOn"), void 0);
  static {
    g(this.prototype, "isOmitted", [tracked], function () {
      return false;
    });
  }
  #isOmitted = (i(this, "isOmitted"), void 0);
  static {
    g(this.prototype, "disabled", [tracked]);
  }
  #disabled = (i(this, "disabled"), void 0); // BEGIN-SNIPPET field-settings-tracked-props.js
  // @tracked omitted;
  static {
    g(this.prototype, "hideValidation", [tracked]);
  }
  #hideValidation = (i(this, "hideValidation"), void 0); // END-SNIPPET
}

export { FormField as default };
//# sourceMappingURL=form-field.js.map
