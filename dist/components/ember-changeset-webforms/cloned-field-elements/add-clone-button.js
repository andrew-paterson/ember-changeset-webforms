import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<button\n  class=\"{{ember-changeset-webforms/dynamic-class-names\n      \'buttonElement,addCloneButton\'\n      @changesetWebform\n      @formField\n    }}\"\n  type=\"button\"\n  {{on \"click\" (fn @onClickAddCloneButton @formField.cloneGroupName)}}\n  data-test-id=\"cwf-add-clone-button\"\n>\n  {{#if @changesetWebform.formSettings.addCloneButtonIconComponent}}\n    <@changesetWebform.formSettings.addCloneButtonIconComponent.componentClass\n      @props={{@changesetWebform.formSettings.addCloneButtonIconComponent.props}}\n      @changesetWebform={{@changesetWebform}}\n      @formField={{@formField}}\n      class={{ember-changeset-webforms/dynamic-class-names\n        \"buttonIcon,addCloneButtonIcon\"\n        @changesetWebform\n      }}\n    />\n  {{/if}}\n  {{or\n    @formField.cloneButtonText\n    (concat \"Add \" @cloneFieldLabel \" field\")\n  }}</button>");

const AddCloneButton = templateOnly();
var AddCloneButtonComponent = setComponentTemplate(TEMPLATE, AddCloneButton);

export { AddCloneButtonComponent as default };
//# sourceMappingURL=add-clone-button.js.map
