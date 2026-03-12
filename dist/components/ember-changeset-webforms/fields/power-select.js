import { action } from '@ember/object';
import Component from '@glimmer/component';
import { typeOf } from '@ember/utils';
import PowerSelectComponent from 'ember-power-select/components/power-select';
import PowerSelectMultipleComponent from 'ember-power-select/components/power-select-multiple';
import 'ember-power-select/styles';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<this.componentClass\n  @allowClear={{@formField.allowClear}}\n  @animationEnabled={{@formField.animationEnabled}}\n  @beforeOptionsComponent={{@formField.beforeOptionsComponent}}\n  @buildSelection={{@formField.buildSelection}}\n  @calculatePosition={{@formField.calculatePosition}}\n  @closeOnSelect={{@formField.closeOnSelect}}\n  @defaultHighlighted={{@formField.defaultHighlighted}}\n  @destination={{@formField.destination}}\n  @disabled={{@formField.disabled}}\n  @dropdownClass={{ember-changeset-webforms/class-names-from-config\n    \"powerSelectDropdown\"\n    @changesetWebform\n    @formField\n  }}\n  @eventType={{@formField.eventType}}\n  @extra={{@formField.extra}}\n  @groupComponent={{@formField.groupComponent}}\n  @highlightOnHover={{@formField.highlightOnHover}}\n  @horizontalPosition={{@formField.horizontalPosition}}\n  @initiallyOpened={{@formField.initiallyOpened}}\n  @loadingMessage={{@formField.loadingMessage}}\n  @matchTriggerWidth={{@formField.matchTriggerWidth}}\n  @matcher={{@formField.matcher}}\n  @noMatchesMessage={{@formField.noMatchesMessage}}\n  @noMatchesMessageComponent={{@formField.noMatchesMessageComponent}}\n  @onBlur={{@formField.onBlur}}\n  @onChange={{fn this.onChange @formField}}\n  @onClose={{@formField.onClose}}\n  @onFocus={{@formField.onFocus}}\n  @onInput={{@formField.onInput}}\n  @onKeydown={{fn this.onKeydown @formField}}\n  @onOpen={{@formField.onOpen}}\n  @options={{@formField.options}}\n  @optionsComponent={{@formField.optionsComponent}}\n  @placeholder={{@formField.placeholder}}\n  @placeholderComponent={{@formField.placeholderComponent}}\n  @preventScroll={{@formField.preventScroll}}\n  @registerAPI={{@formField.registerAPI}}\n  @renderInPlace={{@formField.renderInPlace}}\n  @resultCountMessage={{@formField.resultCountMessage}}\n  @rootEventType={{@formField.rootEventType}}\n  @scrollTo={{@formField.scrollTo}}\n  @search={{@formField.search}}\n  @searchEnabled={{@formField.searchEnabled}}\n  @searchField={{@formField.optionDisplayProp}}\n  @searchFieldPosition={{@formField.searchFieldPosition}}\n  @searchMessage={{@formField.searchMessage}}\n  @searchPlaceholder={{or @formField.searchPlaceholder \"Search\"}}\n  @selected={{@formField.fieldValue}}\n  @selectedItemComponent={{@formField.selectedItemComponent}}\n  @tabindex={{@formField.tabindex}}\n  @afterOptionsComponent={{@formField.afterOptionsComponent}}\n  @triggerComponent={{@formField.triggerComponent}}\n  @triggerId={{@formField.id}}\n  @triggerRole={{@formField.triggerRole}}\n  @typeAheadMatcher={{@formField.typeAheadMatcher}}\n  @verticalPosition={{@formField.verticalPosition}}\n  @ariaDescribedBy={{@formField.ariaDescribedBy}}\n  @ariaLabelledBy={{@formField.ariaLabelledBy}}\n  @ariaInvalid={{@formField.ariaInvalid}}\n  @ariaLabel={{@formField.ariaLabel}}\n  aria-errormessage={{@formField.ariaErrorMessage}}\n  @required={{@formField.required}}\n  @triggerClass={{ember-changeset-webforms/class-names-from-config\n    \"powerSelectTrigger\"\n    @changesetWebform\n    @formField\n  }}\n  as |option|\n>\n  {{#if @formField.optionComponent}}\n    <@formField.optionComponent.componentClass\n      @props={{@formField.optionComponent.props}}\n      @changesetWebform={{@changesetWebform}}\n      @formField={{@formField}}\n      @option={{option}}\n    />\n  {{else}}\n    <Background::PowerSelectOption\n      @option={{option}}\n      @optionDisplayProp={{@formField.optionDisplayProp}}\n      @fieldId={{@formField.fieldId}}\n      @optionName={{if\n        @formField.optionDisplayProp\n        (get option @formField.optionDisplayProp)\n        option\n      }}\n    />\n  {{/if}}\n</this.componentClass>");

class PowerSelect extends Component {
  get test() {
    return {
      allowClear: true
    };
  }
  get componentClass() {
    return this.args.formField.multipleSelection ? PowerSelectMultipleComponent : PowerSelectComponent;
  }
  onChange(formField, value, _selectComponent, event) {
    if ((value || []).length === 0) {
      value = null;
    }
    this.args.updateFieldValue(value);
    this.args.onUserInteraction('optionSelected', value, event);
  }
  static {
    n(this.prototype, "onChange", [action]);
  }
  onKeydown(formField, dropdown, event) {
    const primitiveOptions = dropdown.options.map(option => {
      if (typeOf(option) === 'object' && this.args.formField.optionDisplayProp) {
        return option[this.args.formField.optionDisplayProp];
      } else {
        return option;
      }
    });
    if (event.keyCode === 13) {
      event.preventDefault();
      if (formField.multipleSelection && formField.allowFreeTyping && !primitiveOptions.find(primitiveOption => primitiveOption.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1)) {
        let value = this.fieldValue || [];
        var newItem;
        if (this.args.formField.optionDisplayProp) {
          newItem = {};
          newItem[this.args.formField.optionDisplayProp] = event.target.value;
        } else {
          newItem = event.target.value;
        }
        value.push(newItem);
        this.args.onUserInteraction('keyDownEnterPowerSelectMultiple', newItem, event);
        this.args.updateFieldValue(value, 'keyDownPowerSelect', event);
      }
      this.args.onUserInteraction('keyDownPowerSelect', newItem, event);
    }
  }
  static {
    n(this.prototype, "onKeydown", [action]);
  }
}
setComponentTemplate(TEMPLATE, PowerSelect);

export { PowerSelect as default };
//# sourceMappingURL=power-select.js.map
