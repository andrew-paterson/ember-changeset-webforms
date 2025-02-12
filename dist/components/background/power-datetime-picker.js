import { action } from '@ember/object';
import Component from '@glimmer/component';
import keyCodesMap from '../../utils/keycodes-map.js';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';
import 'ember-power-calendar/styles';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div class=\"power-datetime-picker\" {{did-insert this.didInsert}} ...attributes>\n  <BasicDropdown\n    @renderInPlace={{true}}\n    @onClose={{this.checkDateInputFocus}}\n    as |dropdown|\n  >\n    <dropdown.Trigger\n      @eventName=\"mousedown\"\n      onmousedown={{this.onTriggerFocus}}\n      class={{@triggerWrapperClass}}\n      ariaLabelledBy={{@ariaLabelledBy}}\n      aria-label={{@ariaLabel}}\n    >\n\n      {{#if @value}}\n        <button\n          type=\"button\"\n          class=\"{{@clearDateTimeButtonClass}}\"\n          data-test-id=\"datetime-picker-clear-datetime\"\n          {{on \"click\" this.clearDateTime}}\n        >×</button>\n      {{else}}\n        <div class=\"{{@calendarIconClass}}\"></div>\n      {{/if}}\n      <input\n        type=\"text\"\n        value={{this.dateInputValue}}\n        placeholder={{this.parsedDatepickerPlaceholder}}\n        {{on \"change\" this.onDateInputChange}}\n        {{on \"keyup\" this.onDateInputKeyUp}}\n        {{on \"focus\" this.onDateInputFocus}}\n        {{on \"blur\" this.onDateInputBlur}}\n        class={{@triggerInputClass}}\n        id={{@triggerInputId}}\n        data-test-id=\"power-datepicker-input\"\n      />\n    </dropdown.Trigger>\n    <dropdown.Content\n      data-test-id=\"ecw-power-datepicker-dropdown\"\n      class={{@dropdownClass}}\n    >\n      <div class={{@dropdownInnerClass}}>\n        <PowerCalendar\n          @minDate={{@minDate}}\n          @maxDate={{@maxDate}}\n          @selected={{this.selectedDate}}\n          @onSelect={{fn this.dateClicked dropdown}}\n          @onCenterChange={{this.onCenterChange}}\n          @center={{this.center}}\n          class={{@calendarClass}}\n          as |calendar|\n        >\n          <Background::PowerCalendarNav\n            @calendar={{calendar}}\n            @calendarTitleFormat={{@calendarTitleFormat}}\n            @moveCenter={{calendar.actions.moveCenter}}\n            class={{@calendarNavClass}}\n          />\n          <calendar.Days\n            @minDate={{@minDate}}\n            @maxDate={{@maxDate}}\n            class={{@calendarDaysClass}}\n          />\n        </PowerCalendar>\n        {{#if (and @showTimeSelector @value (not @fixedTime))}}\n          <div\n            data-test-id=\"time-selector\"\n            class=\"time-select\n              {{unless @value \'disabled\'}}\n              {{@timeSelectorContainerClass}}\"\n          >\n            <Background::TimePartInput\n              @value={{@value}}\n              @dateTimeFormat={{@dateTimeFormat}}\n              @timeInputLabelClass={{@timeInputLabelClass}}\n              @keyupAction={{this.onKeyUpTimeUnitInput}}\n              @keydownAction={{this.onKeyDownTimeUnitInput}}\n              @changeAction={{this.setTime}}\n              @timeFormatPart={{get this.timeFormatParts 0}}\n            />\n            <Background::TimePartInput\n              @value={{@value}}\n              @dateTimeFormat={{@dateTimeFormat}}\n              @timeInputLabelClass={{@timeInputLabelClass}}\n              @keyupAction={{this.onKeyUpTimeUnitInput}}\n              @keydownAction={{this.onKeyDownTimeUnitInput}}\n              @changeAction={{this.setTime}}\n              @timeFormatPart={{get this.timeFormatParts 1}}\n            />\n            <Background::TimePartInput\n              @value={{@value}}\n              @dateTimeFormat={{@dateTimeFormat}}\n              @timeInputLabelClass={{@timeInputLabelClass}}\n              @keyupAction={{this.onKeyUpTimeUnitInput}}\n              @keydownAction={{this.onKeyDownTimeUnitInput}}\n              @changeAction={{this.setTime}}\n              @timeFormatPart={{get this.timeFormatParts 2}}\n            />\n            <Background::TimePartInput\n              @value={{@value}}\n              @dateTimeFormat={{@dateTimeFormat}}\n              @timeInputLabelClass={{@timeInputLabelClass}}\n              @keyupAction={{this.onKeyUpTimeUnitInput}}\n              @keydownAction={{this.onKeyDownTimeUnitInput}}\n              @changeAction={{this.setTime}}\n              @timeFormatPart={{get this.timeFormatParts 3}}\n            />\n            {{#if this.showAmPmInput}}\n              <div>\n                <label\n                  for=\"time-selector-am-pm\"\n                  data-test-class=\"time-selector-field-label\"\n                  data-test-id=\"time-selector-field-label-am-pm\"\n                  class={{@timeInputLabelClass}}\n                >{{@timeInputLabels.amPm}}</label>\n                <input\n                  type=\"text\"\n                  id=\"time-selector-am-pm\"\n                  value={{if\n                    @value\n                    (ember-changeset-webforms/moment-format\n                      (ember-changeset-webforms/moment\n                        @value this.parsedDateTimeFormat\n                      )\n                      \"a\"\n                    )\n                  }}\n                  {{on \"change\" this.onChangeAmPm}}\n                  {{on \"focus\" this.onFocusInAmPm}}\n                  {{on \"blur\" this.onChangeAmPm}}\n                  {{on \"keyup\" this.onKeyUpAmPm}}\n                  data-test-id=\"power-datepicker-am-pm-input\"\n                  class={{@timeInputClass}}\n                />\n              </div>\n            {{/if}}\n          </div>\n        {{/if}}\n      </div>\n    </dropdown.Content>\n  </BasicDropdown>\n</div>");

class PowerDatetimePicker extends Component {
  static {
    g(this.prototype, "center", [tracked]);
  }
  #center = (i(this, "center"), undefined);
  static {
    g(this.prototype, "selectedDate", [tracked]);
  }
  #selectedDate = (i(this, "selectedDate"), undefined);
  static {
    g(this.prototype, "defaultTime", [tracked]);
  }
  #defaultTime = (i(this, "defaultTime"), undefined);
  static {
    g(this.prototype, "fixedTime", [tracked]);
  }
  #fixedTime = (i(this, "fixedTime"), undefined);
  static {
    g(this.prototype, "dateTimeFormat", [tracked]);
  }
  #dateTimeFormat = (i(this, "dateTimeFormat"), undefined);
  static {
    g(this.prototype, "dateTimeDisplayFormat", [tracked]);
  }
  #dateTimeDisplayFormat = (i(this, "dateTimeDisplayFormat"), undefined);
  static {
    g(this.prototype, "timeSelectorFields", [tracked]);
  }
  #timeSelectorFields = (i(this, "timeSelectorFields"), undefined);
  get defaultHour() {
    if (!this.args.defaultTime) {
      return '00';
    }
    return this.args.defaultTime.split(':')[0] || '00';
  }
  get defaultMinute() {
    if (!this.args.defaultTime) {
      return '00';
    }
    return this.args.defaultTime.split(':')[1] || '00';
  }
  get defaultSecond() {
    if (!this.args.defaultTime) {
      return '00';
    }
    return this.args.defaultTime.replace('.', ':').split(':')[2] || '00';
  }
  get defaultMillisecond() {
    if (!this.args.defaultTime) {
      return '000';
    }
    return this.args.defaultTime.replace('.', ':').split('.')[3] || '000';
  }
  get fixedTimeParsed() {
    if (!this.args.fixedTime) {
      return null;
    }
    const fixedTime = this.args.fixedTime.replace('.', ':');
    return {
      HH: fixedTime.split(':')[0],
      mm: fixedTime.split(':')[1] || '00',
      ss: fixedTime.split(':')[2] || '00',
      SSS: fixedTime.split(':')[3] || '000'
    };
  }
  get navButtons() {
    var allowNavigationOutOfRange = this.args.allowNavigationOutOfRange;
    return {
      nextMonth: allowNavigationOutOfRange || this.targetInRange(1, 'months'),
      nextYear: allowNavigationOutOfRange || this.targetInRange(1, 'years'),
      previousMonth: allowNavigationOutOfRange || this.targetInRange(-1, 'months'),
      previousYear: allowNavigationOutOfRange || this.targetInRange(-1, 'years')
    };
  }
  get parsedDateTimeDisplayFormat() {
    return this.args.dateTimeDisplayFormat || this.args.dateTimeFormat;
  }
  get showAmPmInput() {
    return this.args.timeSelectorFields.filter(field => field.startsWith('h')).length ? true : false;
  }
  get timeFormatParts() {
    return this.args.timeSelectorFields.map(item => {
      const obj = {
        formatChar: item,
        min: '0'
      };
      if (item.startsWith('h')) {
        obj.min = '1';
        obj.max = '12';
        obj.label = this.args.timeInputLabels.hours;
        obj.type = 'hour';
      } else if (item.startsWith('H')) {
        obj.max = '23';
        obj.label = this.args.timeInputLabels.hours;
        obj.type = 'hour';
      } else if (item.startsWith('k')) {
        obj.min = '1';
        obj.max = '24';
        obj.label = this.args.timeInputLabels.hours;
        obj.type = 'hour';
      } else if (item.startsWith('m')) {
        obj.max = '59';
        obj.label = this.args.timeInputLabels.minutes;
        obj.type = 'minutes';
      } else if (item.startsWith('s')) {
        obj.max = '59';
        obj.label = this.args.timeInputLabels.seconds;
        obj.type = 'seconds';
      } else if (item.startsWith('S')) {
        obj.formatChar = 'SSS';
        obj.max = '999';
        obj.label = this.args.timeInputLabels.milliseconds;
        obj.type = 'milliseconds';
      }
      return obj;
    }).filter(item => item.label);
  }
  get parsedDatepickerPlaceholder() {
    return this.args.datepickerPlaceholder || this.parsedDateTimeDisplayFormat;
  }
  get dateInputValue() {
    if (!this.args.value) {
      return null;
    }
    return moment(this.args.value, this.args.dateTimeFormat).format(this.parsedDateTimeDisplayFormat);
  }
  validMoment(event) {
    var parsedDateTimeDisplayFormat = this.parsedDateTimeDisplayFormat;
    const value = event.target.value;
    const strictDateFormat = parsedDateTimeDisplayFormat.replace(/S{1,}/, 'SSSS'); // Using SSSS for the milisecond part of the format means that the input will be a valid moment object if the user enters more than 3 digits. The field will all but the first three.
    if (!moment(value, strictDateFormat, true).isValid()) {
      return null;
    }
    if (moment(value, parsedDateTimeDisplayFormat).isBefore(moment(this.args.minDate, 'YYYY-MM-DD'))) {
      return null;
    }
    if (moment(value, parsedDateTimeDisplayFormat).isAfter(moment(this.args.maxDate, 'YYYY-MM-DD'))) {
      return null;
    }
    return moment(value, parsedDateTimeDisplayFormat).toDate();
  }
  updateDate(selectedDate, currentDateTime) {
    var currentHour = moment(currentDateTime).hour();
    var currentMinute = moment(currentDateTime).minute();
    var currentSecond = moment(currentDateTime).second();
    var currentMillisecond = moment(currentDateTime).millisecond();
    var newDateTime;
    if (currentDateTime) {
      newDateTime = moment(selectedDate).hour(currentHour).minute(currentMinute).second(currentSecond).millisecond(currentMillisecond).toDate();
    } else {
      newDateTime = moment(selectedDate).hour(this.defaultHour).minute(this.defaultMinute).second(this.defaultSecond).millisecond(this.defaultMillisecond).toDate();
    }
    return newDateTime;
  }
  updateTimeUnit(unit, value, currentDateTime) {
    let newDateTime;
    if (unit.startsWith('h')) {
      if (moment(currentDateTime, this.args.dateTimeFormat).format('a') === 'pm' && parseInt(value) < 12) {
        value = parseInt(value) + 12;
      } else if (moment(currentDateTime, this.args.dateTimeFormat).format('a') === 'am' && parseInt(value) === 12) {
        value = 0;
      }
      newDateTime = moment(currentDateTime, this.args.dateTimeFormat).hour(value);
    } else if (unit.startsWith('H')) {
      newDateTime = moment(currentDateTime, this.args.dateTimeFormat).hour(value);
    } else if (unit.startsWith('m')) {
      newDateTime = moment(currentDateTime, this.args.dateTimeFormat).minute(value);
    } else if (unit.startsWith('s')) {
      newDateTime = moment(currentDateTime, this.args.dateTimeFormat).second(value);
    } else if (unit.startsWith('S')) {
      newDateTime = moment(currentDateTime, this.args.dateTimeFormat).millisecond(value);
    } else if (unit.toLowerCase().startsWith('a')) {
      if (moment(currentDateTime, this.args.dateTimeFormat).format('a') !== value) {
        const currentHour = moment(currentDateTime, this.args.dateTimeFormat).hour();
        let newHour;
        if (value === 'am') {
          newHour = currentHour - 12;
        } else if (value === 'pm') {
          newHour = currentHour + 12;
        }
        newDateTime = moment(currentDateTime, this.args.dateTimeFormat).hour(newHour);
      } else {
        newDateTime = moment(currentDateTime, this.args.dateTimeFormat);
      }
    }
    return newDateTime.toDate();
  }
  onCenterChange(newDate) {
    let newCenter = newDate.date ? newDate.date : newDate;
    this.center = newCenter;
  }
  static {
    n(this.prototype, "onCenterChange", [action]);
  }
  didInsert() {
    if (this.args.defaultDate) {
      this.selectedDate = this.args.defaultDate;
    }
    if (this.args.defaultTime) {
      this.selectedHour = this.defaultHour;
      this.selectedMinute = this.defaultMinute;
      this.selectedSecond = this.defaultSecond;
    }
    if (this.args.calendarStartMonth) {
      const calendarStartDate = moment(`01/${this.args.calendarStartMonth}`, 'DD/MM/YYYY');
      this.calendarStartDate = calendarStartDate;
    }
    if (moment.isDate(this.args.value)) {
      this.insertWithValue(this.args.value);
    } else if (moment(this.args.value).isValid()) {
      this.insertWithValue(moment(this.args.value, this.args.dateTimeFormat).toDate());
    }
    if (this.args.fixedTime && this.args.showTimeSelector) {
      console.warn('[Ember Changeset Webforms] You have set showTimeSelector to true, but you have also passed fixedTime. fixedTime must be null in order to show the tine selector component.');
    }
  }
  static {
    n(this.prototype, "didInsert", [action]);
  }
  insertWithValue(dateTime) {
    this.center = dateTime;
    if (this.fixedTimeParsed) {
      for (const key in this.fixedTimeParsed) {
        dateTime = this.updateTimeUnit(key, this.fixedTimeParsed[key], dateTime);
      }
    }
    this.selectedDate = dateTime;
  }
  static {
    n(this.prototype, "insertWithValue", [action]);
  }
  onDateInputChange(event) {
    if (this.validMoment(event)) {
      this.updateDateTime(this.validMoment(event));
    } else {
      event.target.value = this.dateInputValue;
    }
  }
  static {
    n(this.prototype, "onDateInputChange", [action]);
  }
  onDateInputKeyUp(event) {
    const {
      keys
    } = keyCodesMap;
    if (event.keyCode !== keys.backspace && event.keyCode !== keys.delete && this.validMoment(event)) {
      this.updateDateTime(this.validMoment(event));
    }
    if (this.args.onUserInteraction) {
      this.args.onUserInteraction('keyUpDateTimeInput', event.target.value, event);
    }
  }
  static {
    n(this.prototype, "onDateInputKeyUp", [action]);
  }
  checkDateInputFocus() {
    if (this.dateInputFocussed) {
      return false;
    }
    return true;
  }
  static {
    n(this.prototype, "checkDateInputFocus", [action]);
  }
  onDateInputFocus(event) {
    this.dateInputFocussed = true;
    if (this.args.onUserInteraction) {
      this.args.onUserInteraction('focusDateTimeInput', event.target.value, event);
    }
  }
  static {
    n(this.prototype, "onDateInputFocus", [action]);
  }
  onDateInputBlur(event) {
    this.dateInputFocussed = false;
    if (this.args.onUserInteraction) {
      this.args.onUserInteraction('blurDateTimeInput', event.target.value, event);
    }
  }
  static {
    n(this.prototype, "onDateInputBlur", [action]);
  }
  clearDateTime() {
    this.args.onSelectDateTime(null);
    if (this.args.onUserInteraction) {
      this.args.onUserInteraction('clearDateTime', this.args.value);
    }
  }
  static {
    n(this.prototype, "clearDateTime", [action]);
  }
  dateClicked(dropdown, value) {
    this.setDate(value.date);
    if (this.args.closeDatePickerOnSelect) {
      dropdown.actions.close();
    }
    if (this.args.onUserInteraction) {
      this.args.onUserInteraction('dateSelected', value.date);
    }
  }
  static {
    n(this.prototype, "dateClicked", [action]);
  }
  setDate(selectedDate) {
    var currentDateTime = this.args.value;
    this.updateDateTime(this.updateDate(selectedDate, currentDateTime));
  }
  static {
    n(this.prototype, "setDate", [action]);
  }
  setTime(unit, event) {
    if (!event.target.value) {
      return;
    }
    if (event.target.getAttribute('min') && event.target.getAttribute('max')) {
      event.target.value = this.conformBounds(event.target.value, {
        min: event.target.getAttribute('min'),
        max: event.target.getAttribute('max'),
        length: unit.length
      });
    }
    let value = event.target.value;
    var currentDateTime = this.args.value;
    const newDateTime = this.updateTimeUnit(unit, value, currentDateTime);
    this.updateDateTime(newDateTime);
  }
  static {
    n(this.prototype, "setTime", [action]);
  }
  onKeyDownTimeUnitInput(unit, event) {
    const {
      keys
    } = keyCodesMap;
    if (event.keyCode !== keys.arrowUp && event.keyCode !== keys.arrowDown) {
      return;
    }
    let newValue;
    let increment;
    if (event.keyCode === keys.arrowUp) {
      increment = 1;
      if (event.shiftKey) {
        increment = 10;
      }
      if (event.shiftKey && event.ctrlKey) {
        increment = 100;
      }
      let initialValue = event.target.value ? parseInt(event.target.value) : 0;
      newValue = initialValue += increment;
    }
    if (event.keyCode === keys.arrowDown) {
      increment = 1;
      if (event.shiftKey) {
        increment = 10;
      }
      if (event.shiftKey && event.ctrlKey) {
        increment = 100;
      }
      let initialValue = event.target.value ? parseInt(event.target.value) : 0;
      newValue = initialValue = initialValue - increment;
    }
    if (!increment) {
      return;
    }
    event.target.value = newValue;
    this.setTime(unit, event);
    if (this.args.onUserInteraction) {
      this.args.onUserInteraction('keyDownTimeUnitInput', event.target.value, event);
    }
  }
  static {
    n(this.prototype, "onKeyDownTimeUnitInput", [action]);
  }
  onKeyUpTimeUnitInput(unit, event) {
    if (event.target.value.length >= unit.length) {
      this.setTime(unit, event);
    }
    if (this.args.onUserInteraction) {
      this.args.onUserInteraction('keyUpTimeUnitInput', event.target.value, event);
    }
  }
  static {
    n(this.prototype, "onKeyUpTimeUnitInput", [action]);
  }
  onFocusInAmPm(event) {
    event.target.value = '';
    if (this.args.onUserInteraction) {
      this.args.onUserInteraction('focusAmPmInput', event.target.value, event);
    }
  }
  static {
    n(this.prototype, "onFocusInAmPm", [action]);
  }
  onChangeAmPm(event) {
    var currentDateTime = this.args.value;
    const value = event.target.value.toLowerCase();
    if (value !== 'am' && value !== 'pm') {
      event.target.value = moment(currentDateTime, this.args.dateTimeFormat).format('a');
    }
    this.setTime('a', event);
  }
  static {
    n(this.prototype, "onChangeAmPm", [action]);
  }
  onKeyUpAmPm(event) {
    if (this.args.onUserInteraction) {
      this.args.onUserInteraction('keyUpAmPmInput', event.target.value, event);
    }
    const {
      keys
    } = keyCodesMap;
    const amKeyCodes = [keys.a, keys.arrowUp];
    const pmKeyCodes = [keys.p, keys.arrowDown];
    const clearKeyCodes = [keys.backspace, keys.delete];
    if (event.keyCode === keys.m) {
      if (event.target.value === 'amm') {
        event.target.value = 'am';
      }
      if (event.target.value === 'pmm') {
        event.target.value = 'pm';
      }
    }
    if (amKeyCodes.indexOf(event.keyCode) > -1) {
      event.target.value = 'am';
    }
    if (pmKeyCodes.indexOf(event.keyCode) > -1) {
      event.target.value = 'pm';
    }
    if (clearKeyCodes.indexOf(event.keyCode) > -1) {
      event.target.value = '';
    }
    if (event.target.value === 'am' || event.target.value === 'pm') {
      this.setTime('a', event);
    }
  }
  static {
    n(this.prototype, "onKeyUpAmPm", [action]);
  }
  updateDateTime(dateTime) {
    this.center = dateTime;
    if (this.fixedTimeParsed) {
      for (const key in this.fixedTimeParsed) {
        dateTime = this.updateTimeUnit(key, this.fixedTimeParsed[key], dateTime);
      }
    }
    this.selectedDate = dateTime;
    this.args.onSelectDateTime(dateTime);
  }
  static {
    n(this.prototype, "updateDateTime", [action]);
  }
  onTriggerFocus() {
    if (this.center) {
      return;
    }
    var startDate = this.calendarStartDate || moment().toDate();
    if (this.args.maxDate < moment().toDate()) {
      startDate = this.args.maxDate;
    }
    if (this.args.minDate > moment().toDate() || this.args.minDate < moment().toDate() && this.args.maxDate < moment().toDate() || this.args.minDate > moment().toDate() && this.args.maxDate > moment().toDate()) {
      startDate = this.args.minDate;
    }
    this.center = startDate;
  }
  static {
    n(this.prototype, "onTriggerFocus", [action]);
  }
  navigate(datepicker, span, units) {
    if (this.args.allowNavigationOutOfRange || this.targetInRange(span, units)) {
      datepicker.actions.moveCenter(span, units);
    }
  }
  static {
    n(this.prototype, "navigate", [action]);
  }
  selectDay(datepicker, span, units) {
    var targetDay;
    var startOfVisibleMonth = moment(this.center).startOf('month').toDate();
    var endOfVisibleMonth = moment(this.center).endOf('month').toDate();
    var currentSelected = moment(this.selectedDate);
    if (this.selectedDate >= startOfVisibleMonth && this.selectedDate <= endOfVisibleMonth) {
      targetDay = currentSelected.add(span, units);
    } else {
      targetDay = startOfVisibleMonth;
    }
    if (targetDay > this.args.maxDate) {
      targetDay = this.args.maxDate;
    }
    if (targetDay < this.args.minDate) {
      targetDay = this.args.minDate;
    }
    this.selectedDate = targetDay;
    this.center = this.selectedDate;
  }
  static {
    n(this.prototype, "selectDay", [action]);
  }
  onTriggerKeydown(datepicker, e) {
    if (e.keyCode === 13) {
      this.setDate(this.selectedDate);
      e.preventDefault();
    }
    if (e.keyCode === 39) {
      if (e.metaKey) {
        if (e.shiftKey) {
          this.navigate(datepicker, 1, 'years');
        } else {
          this.navigate(datepicker, 1, 'months');
        }
      } else {
        this.selectDay(datepicker, 1, 'days');
      }
      e.preventDefault();
    }
    if (e.keyCode === 37) {
      if (e.metaKey) {
        if (e.shiftKey) {
          this.navigate(datepicker, -1, 'years');
        } else {
          this.navigate(datepicker, -1, 'months');
        }
      } else {
        this.selectDay(datepicker, -1, 'days');
      }
      e.preventDefault();
    }
    if (e.keyCode === 40) {
      if (!datepicker.isOpen) {
        datepicker.actions.open();
      } else {
        this.selectDay(datepicker, 7, 'days');
      }
      e.preventDefault();
    }
    if (e.keyCode === 38) {
      if (!datepicker.isOpen) {
        datepicker.actions.open();
      } else {
        this.selectDay(datepicker, -7, 'days');
      }
      e.preventDefault();
    }
  }
  static {
    n(this.prototype, "onTriggerKeydown", [action]);
  }
  targetInRange(span, units) {
    var firstOfTargetMonth = moment(this.center).add(span, units).startOf('month').toDate();
    var lastOfTargetMonth = moment(this.center).add(span, units).endOf('month').toDate();
    if (firstOfTargetMonth > this.args.maxDate || lastOfTargetMonth < this.args.minDate) {
      return false;
    }
    return true;
  }
  conformBounds(value, opts) {
    const int = parseInt(value);
    const max = parseInt(opts.max);
    const min = parseInt(opts.min);
    if (int < min) {
      return min.toLocaleString('en-US', {
        minimumIntegerDigits: opts.length,
        useGrouping: false
      });
    } else if (int > max) {
      return max;
    }
    return int.toLocaleString('en-US', {
      minimumIntegerDigits: opts.length,
      useGrouping: false
    });
  }
}
setComponentTemplate(TEMPLATE, PowerDatetimePicker);

export { PowerDatetimePicker as default };
//# sourceMappingURL=power-datetime-picker.js.map
