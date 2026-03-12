import { action } from '@ember/object';
import Component from '@glimmer/component';
import moment from 'moment';
import './power-datepicker.css';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<Background::PowerDatetimePicker\n  @formField={{@formField}}\n  @value={{@formField.fieldValue}}\n  @dateButtonComponent={{@formField.dateButtonComponent}}\n  @dateButtonText={{@formField.dateButtonText}}\n  @minDate={{@formField.minDate}}\n  @maxDate={{@formField.maxDate}}\n  @showTimeSelector={{@formField.showTimeSelector}}\n  @name={{@formField.name}}\n  @timeButtonText={{@formField.timeButtonText}}\n  @calendarStartMonth={{@formField.calendarStartMonth}}\n  @allowNavigationOutOfRange={{@formField.allowNavigationOutOfRange}}\n  @defaultTime={{@formField.defaultTime}}\n  @fixedTime={{@formField.fixedTime}}\n  @defaultDate={{@formField.defaultDate}}\n  @onChange={{@onChange}}\n  @onUserInteraction={{@onUserInteraction}}\n  @onSelectDateTime={{this.onSelectDateTime}}\n  @datepickerPlaceholder={{@formField.datepickerPlaceholder}}\n  @closeDatePickerOnSelect={{@formField.closeDatePickerOnSelect}}\n  @dateTimeFormat={{@formField.dateTimeFormat}}\n  @dateTimeDisplayFormat={{@formField.dateTimeDisplayFormat}}\n  @timeSelectorFields={{this.timeSelectorFields}}\n  @timeInputLabels={{@formField.timeInputLabels}}\n  @calendarTitleFormat={{@formField.calendarTitleFormat}}\n  @triggerInputId={{@formField.id}}\n  @ariaInvalid={{@formField.ariaInvalid}}\n  @ariaLabel={{@formField.ariaLabel}}\n  @ariaLabelledBy={{@formField.ariaLabelledBy}}\n  @ariaDescribedBy={{@formField.ariaDescribedBy}}\n  @ariaErrorMessage={{@formField.ariaErrorMessage}}\n  @required={{@formField.required}}\n  @changesetWebform={{@changesetWebform}}\n/>");

class PowerDatepicker extends Component {
  get timeSelectorFields() {
    return (this.args.formField.timeSelectorFields || '').split(',');
  }
  onSelectDateTime(dateTime) {
    var formField = this.args.formField;
    if (formField.dateRangeSettings) {
      var rangePartner = this.args.formFields.find(field => field.fieldId === formField.dateRangeSettings.rangePartnerFieldId);
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
