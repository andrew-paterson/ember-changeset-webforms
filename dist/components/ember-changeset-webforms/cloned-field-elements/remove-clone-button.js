import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if\n  (and @formField.isClone (not-eq @masterFormField.cloneCountStatus \"min\"))\n}}\n  <div\n    role=\"button\"\n    class=\"{{ember-changeset-webforms/dynamic-class-names\n        \'removeCloneButton\'\n        @changesetWebform\n        @formField\n      }}\"\n    type=\"button\"\n    {{on \"click\" (fn @removeClone @formField)}}\n    data-test-class=\"cwf-remove-clone-button\"\n    title=\"Remove {{@formField.fieldId}}\"\n  >\n    <@masterFormField.removeCloneComponent.componentClass\n      @props={{@props}}\n      @changesetWebform={{@changesetWebform}}\n      @formField={{@masterFormField}}\n      @formFieldClone={{@formField}}\n      class=\"{{ember-changeset-webforms/dynamic-class-names\n          \'removeCloneButtonIcon\'\n          @changesetWebform\n          @formField\n        }}\"\n    />\n  </div>\n{{/if}}");

class EmberChangesetWebformsClonedFieldElementsRemoveCloneButtonComponent extends Component {}
setComponentTemplate(TEMPLATE, EmberChangesetWebformsClonedFieldElementsRemoveCloneButtonComponent);

export { EmberChangesetWebformsClonedFieldElementsRemoveCloneButtonComponent as default };
//# sourceMappingURL=remove-clone-button.js.map
