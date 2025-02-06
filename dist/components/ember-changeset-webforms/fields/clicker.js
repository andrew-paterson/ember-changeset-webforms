import { action } from '@ember/object';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<EmberChangesetWebforms::FieldElements::FieldLabel @formField={{@formField}} />\n{{#if @formField.displayComponent}}\n  <@formField.displayComponent.componentClass\n    @props={{@formField.displayComponent.props}}\n    @formField={{@formField}}\n    @changesetWebform={{@changesetWebform}}\n    @clickerElementClass={{ember-changeset-webforms/dynamic-class-names\n      \"clickerElement\"\n      @changesetWebform\n      @formField\n    }}\n    @onClick={{fn this.onClick @formField}}\n  />\n{{else}}\n  <div\n    role=\"button\"\n    class={{ember-changeset-webforms/dynamic-class-names\n      \"clickerElement\"\n      @changesetWebform\n      @formField\n      @formField.validationStatus\n    }}\n    {{on \"click\" (fn this.onClick @formField)}}\n    data-test-class=\"cwf-clicker-element\"\n  >{{@formField.clickerText}}</div>\n{{/if}}");

class Clicker extends Component {
  onClick(formField, event) {
    this.args.onUserInteraction('click', null, event);
  }
  static {
    n(this.prototype, "onClick", [action]);
  }
}
setComponentTemplate(TEMPLATE, Clicker);

export { Clicker as default };
//# sourceMappingURL=clicker.js.map
