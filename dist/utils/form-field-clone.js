import { FormFieldClone as FormFieldClone$1 } from 'validated-changeset-webforms';
import { tracked } from '@glimmer/tracking';
import { TrackedArray } from 'tracked-built-ins';
import { g, i } from 'decorator-transforms/runtime';

class FormFieldClone extends FormFieldClone$1 {
  static {
    g(this.prototype, "index", [tracked]);
  }
  #index = (i(this, "index"), void 0);
  static {
    g(this.prototype, "id", [tracked]);
  }
  #id = (i(this, "id"), void 0);
  static {
    g(this.prototype, "eventLog", [tracked]);
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
    g(this.prototype, "fieldLabel", [tracked]);
  }
  #fieldLabel = (i(this, "fieldLabel"), void 0);
  static {
    g(this.prototype, "omittedExplicitly", [tracked]);
  }
  #omittedExplicitly = (i(this, "omittedExplicitly"), void 0); // BEGIN-SNIPPET cloned-field-settings-tracked-props.js
  static {
    g(this.prototype, "disabled", [tracked]);
  }
  #disabled = (i(this, "disabled"), void 0);
  static {
    g(this.prototype, "externalProps", [tracked]);
  }
  #externalProps = (i(this, "externalProps"), void 0);
  // END-SNIPPET

  constructor(args) {
    super(args);
    this.eventLog = TrackedArray.from([]);
  }
}

export { FormFieldClone as default };
//# sourceMappingURL=form-field-clone.js.map
