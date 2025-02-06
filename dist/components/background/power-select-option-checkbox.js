import Component from '@glimmer/component';
import { action } from '@ember/object';
import safeName from '../../utils/safe-name.js';
import './power-select-option-checkbox.css';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  class=\"form-check\"\n  {{did-insert this.didInsert}}\n  {{did-update this.selectionChanged @selected}}\n>\n  <input\n    id={{this.checkboxId}}\n    type=\"checkbox\"\n    aria-labelledby={{this.labelId}}\n    class=\"{{ember-changeset-webforms/dynamic-class-names\n        \'checkboxElement\'\n        @changesetWebform\n      }}\n      {{ember-changeset-webforms/dynamic-class-names\n        \'powerSelectOptionCheckbox\'\n        @changesetWebform\n      }}\"\n  />\n  <label\n    id={{this.labelId}}\n    for={{this.checkboxId}}\n    class=\"cwf-field-power-select-item cwf-field-power-select-option-with-checkbox\n      {{sanitise-classname @optionName}}\n      \"\n    ...attributes\n  >\n    {{@optionName}}\n  </label>\n</div>");

class PowerSelectOptionCheckbox extends Component {
  get isSelected() {
    return (this.args.selected || []).includes(this.args.option);
  }
  get checkboxId() {
    return safeName(`power-select-checkbox-option-${this.args.optionName}-checkbox`);
  }
  get labelId() {
    return this.checkboxId ? `${this.checkboxId}-label` : null;
  }
  selectionChanged() {
    setTimeout(() => {
      this.el.querySelector('input').checked = this.isSelected;
    });
  }
  static {
    n(this.prototype, "selectionChanged", [action]);
  }
  didInsert(el) {
    this.el = el;
    setTimeout(() => {
      this.el.querySelector('input').checked = this.isSelected;
    });
  }
  static {
    n(this.prototype, "didInsert", [action]);
  }
}
setComponentTemplate(TEMPLATE, PowerSelectOptionCheckbox);

export { PowerSelectOptionCheckbox as default };
//# sourceMappingURL=power-select-option-checkbox.js.map
