import Component from '@glimmer/component';
import dynamicClassNames from '../../../utils/dynamic-class-names.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<button\n  type={{this.customType}}\n  data-test-id={{this.data-test-id}}\n  disabled={{this.disabled}}\n  ...attributes\n>\n  {{@formSettings.submitButtonText}}\n  {{#if @changesetWebform.formSettings.requestInFlight}}\n    {{#if @formSettings.submitButtonIconComponent}}\n      <@formSettings.submitButtonIconComponent.componentClass\n        @props={{@formSettings.submitButtonIconComponent}}\n        @changesetWebform={{@changesetWebform}}\n        class={{ember-changeset-webforms/dynamic-class-names\n          \"buttonIcon,submitButtonIconComponent\"\n          @changesetWebform\n        }}\n      />\n    {{else}}\n      <div></div>\n    {{/if}}\n  {{/if}}\n</button>");

class FormSubmitButton extends Component {
  customType = 'button'; // TODO make configurable

  get requestInFlightClassNames() {
    return dynamicClassNames('submitButton', this.args.changesetWebform);
  }
}
setComponentTemplate(TEMPLATE, FormSubmitButton);

export { FormSubmitButton as default };
//# sourceMappingURL=form-submit-button.js.map
