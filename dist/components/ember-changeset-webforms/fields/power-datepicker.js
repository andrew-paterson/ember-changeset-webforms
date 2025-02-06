import { action } from '@ember/object';
import Component from '@glimmer/component';
import moment from 'moment';
import './power-datepicker.css';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<Background::PowerDatetimePicker\n  @trash={{false}}\n  @formField={{@formField}}\n  @value={{@formField.fieldValue}}\n  @dateButtonComponent={{@formField.dateButtonComponent}}\n  @dateButtonText={{@formField.dateButtonText}}\n  @minDate={{@formField.minDate}}\n  @maxDate={{@formField.maxDate}}\n  @showTimeSelector={{@formField.showTimeSelector}}\n  @name={{@formField.name}}\n  @timeButtonText={{@formField.timeButtonText}}\n  @calendarStartMonth={{@formField.calendarStartMonth}}\n  @allowNavigationOutOfRange={{@formField.allowNavigationOutOfRange}}\n  @defaultTime={{@formField.defaultTime}}\n  @fixedTime={{@formField.fixedTime}}\n  @defaultDate={{@formField.defaultDate}}\n  @onChange={{@onChange}}\n  @onUserInteraction={{@onUserInteraction}}\n  @onSelectDateTime={{this.onSelectDateTime}}\n  @datepickerPlaceholder={{@formField.datepickerPlaceholder}}\n  @closeDatePickerOnSelect={{@formField.closeDatePickerOnSelect}}\n  @dateTimeFormat={{@formField.dateTimeFormat}}\n  @dateTimeDisplayFormat={{@formField.dateTimeDisplayFormat}}\n  @timeSelectorFields={{this.timeSelectorFields}}\n  @timeInputLabels={{@formField.timeInputLabels}}\n  @calendarTitleFormat={{@formField.calendarTitleFormat}}\n  @clearDateTimeButtonClass=\"{{ember-changeset-webforms/dynamic-class-names\n    \'powerDatePickerClearButton\'\n    @changesetWebform\n    @formField\n    @formField.validationStatus\n  }}\"\n  @calendarIconClass=\"{{ember-changeset-webforms/dynamic-class-names\n    \'powerDatePickerCalendarIcon\'\n    @changesetWebform\n    @formField\n    @formField.validationStatus\n  }}\"\n  @triggerInputClass=\"{{ember-changeset-webforms/dynamic-class-names\n    \'powerDatePickerTriggerInput\'\n    @changesetWebform\n    @formField\n    @formField.validationStatus\n  }}\"\n  @triggerWrapperClass=\"{{ember-changeset-webforms/dynamic-class-names\n    \'powerDatePickerTriggerWrapper\'\n    @changesetWebform\n    @formField\n    @formField.validationStatus\n  }}\"\n  @dropdownClass=\"{{ember-changeset-webforms/dynamic-class-names\n    \'powerDatePickerDropdown\'\n    @changesetWebform\n    @formField\n    @formField.validationStatus\n  }}\"\n  @dropdownInnerClass=\"{{ember-changeset-webforms/dynamic-class-names\n    \'powerDatePickerDropdownInner\'\n    @changesetWebform\n    @formField\n    @formField.validationStatus\n  }}\"\n  @calendarNavClass=\"{{ember-changeset-webforms/dynamic-class-names\n    \'powerDatePickerCalendarNav\'\n    @changesetWebform\n    @formField\n    @formField.validationStatus\n  }}\"\n  @calendarDaysClass=\"{{ember-changeset-webforms/dynamic-class-names\n    \'powerDatePickerCalendarDays\'\n    @changesetWebform\n    @formField\n    @formField.validationStatus\n  }}\"\n  calendarNavClass\n  @calendarClass=\"{{ember-changeset-webforms/dynamic-class-names\n    \'powerDatePickerCalendar\'\n    @changesetWebform\n    @formField\n    @formField.validationStatus\n  }}\"\n  @timeSelectorContainerClass=\"{{ember-changeset-webforms/dynamic-class-names\n    \'powerDatePickerTimeSelectorContainer\'\n    @changesetWebform\n    @formField\n    @formField.validationStatus\n  }}\"\n  @timeInputLabelClass=\"{{ember-changeset-webforms/dynamic-class-names\n    \'label\'\n    @changesetWebform\n    @formField\n    @formField.validationStatus\n  }}\"\n  @timeInputClass=\"{{ember-changeset-webforms/dynamic-class-names\n    \'inputElement,powerDatePickerTimeSelectorInput\'\n    @changesetWebform\n    @formField\n    @formField.validationStatus\n  }}\"\n  @triggerInputId={{@formField.id}}\n  @ariaLabelledBy={{@ariaLabelledBy}}\n  @ariaLabel={{@ariaLabel}}\n/>");

class PowerDatepicker extends Component {
  get timeSelectorFields() {
    return (this.args.formField.timeSelectorFields || '').split(',');
  }
  onSelectDateTime(dateTime) {
    var formField = this.args.formField;
    if (formField.dateRangeSettings) {
      var rangePartner = this.args.formFields.findBy('fieldId', formField.dateRangeSettings.rangePartnerFieldId);
      if (rangePartner) {
        if (rangePartner.dateRangeSettings.rangePosition === 'start') {
          rangePartner.maxDate = dateTime;
        } else if (rangePartner.dateRangeSettings.rangePosition === 'end') {
          rangePartner.minDate = dateTime;
        }
      }
    }
    const formatted = dateTime ? moment(dateTime).format(`${this.args.formField.dateTimeFormat.replace(/S{1,}/, 'SSS')}`).toString() : null; // TODO this must default simply to moment(dateTime).toDate() to accommodate ember attr 'date', and allow user to specify output function to override this when defining field.
    this.args.updateFieldValue(formatted);
  }
  static {
    n(this.prototype, "onSelectDateTime", [action]);
  }
}
setComponentTemplate(TEMPLATE, PowerDatepicker);

export { PowerDatepicker as default };
//# sourceMappingURL=power-datepicker.js.map
