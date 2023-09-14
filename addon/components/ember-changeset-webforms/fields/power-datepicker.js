import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class PowerDatepicker extends Component {
  get timeSelectorFields() {
    return (this.formField.timeSelectorFields || '').split(',');
  }

  @action
  onSelectDateTime(dateTime) {
    var formField = this.formField;
    if (formField.dateRangeSettings) {
      var rangePartner = this.formFields.findBy(
        'fieldId',
        formField.dateRangeSettings.rangePartnerFieldId
      );
      if (rangePartner) {
        if (rangePartner.dateRangeSettings.rangePosition === 'start') {
          rangePartner.maxDate = dateTime;
        } else if (rangePartner.dateRangeSettings.rangePosition === 'end') {
          rangePartner.minDate = dateTime;
        }
      }
    }
    const formatted = dateTime
      ? moment(dateTime)
          .format(`${this.formField.dateTimeFormat.replace(/S{1,}/, 'SSS')}`)
          .toString()
      : null; // TODO this must default simply to moment(dateTime).toDate() to accommodate ember attr 'date', and allow user to specify output function to override this when defining field.
    this.onChange(formField, formatted);
  }
}
