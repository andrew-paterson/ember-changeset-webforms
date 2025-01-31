# Power datepicker

Displays an input which shows the current selected date or datetime. When the input is focussed, a dropdown shows, including an [Ember Power Calendar](https://ember-power-calendar.com) component, and optionally a time selection component below that.

In order to use this field, you will need to [install Ember Power Calendar and import the related styles](https://ember-power-calendar.com/docs/installation) in your comsuming application.

The datetime can be updated by simply editing the string in the trigger input, or bu using the calendar component, and the time selector component is it is shown.

The `dateTimeFormat` option is important. This is the format which will be used by momentjs to parse any dates being passed to the field, wither by setting `defaultValue` on the field,or if it is passed as past of the `data` object to the `changesetWebform` component.

The value output by this field will also always be a formatted according to this format.

## Power datepicker field props

<DocsSnippet @name="powerDatePicker-field-options.js" />

The above props are in addition to the generic field props shown with their default values below.

{{docs-snippet name="generic-field-settings.js" title="Default generic field settings and their values"}}

## defaultValue

`defaultValue` can be passed as a native JavaScript date object, a `moment` object, or a string in the format of `dateTimeFormat`.

When the field is inersted, it will parse the supplied datetime into the format of the fields `dateTimeFormat` property, and set the value of the field to the resulting string.

## Basic usage - date only selection

<Demos::PowerDatepickerExampleOne />

## With fixed time

`fixedTime` can be passed in the format `HH:mm:ss.SSS`. When present, the time portion of the field values will be fixed to this value.

Note that setting `showTimeSelector` to`true` will have no effect if `fixedTime` is passed.

<Demos::PowerDatepickerExampleOneB />

## With minDate and maxDate

`minDate` and `maxDate` can both be passed in order to set the earliest and latest allowed dates respectively. In the calendar component, all dates before `minDate` or after `maxDate` will be disabled.

If the user types a date into the trigger input which is before `minDate` or after `maxDate`, then when the `onChnage` event fires, the value will be ignored and the trigger will be reset to its previous value.

<Demos::PowerDatepickerExampleOneC />

## With time selector using default units

If `showTimeSelector` is `true` then by default a series of inputs will be shown for time selection, based on a 24 hours clock with hours, minutes, seconds and milliseconds.

All inputs can be updated either by typing numbers, or by using the arrow keys.

- An arrow key on its own increments the value by 1.
- An arrow key + `Shift` increments the value by 10.
- An arrow key + `Ctrl` + `Shift` increments the value by 100.

If the user input exceeds the maximum value for the relevant time unit, the value will be forcibly set to the maximum value.

If the user input is lower than the minimum value for the relevant time unit, the value will be forcibly set to the minimum value.

<Demos::PowerDatepickerExampleThree />

## With time selector using custom format

`timeSelectorFields` can be passed as a comma separated string of [valid momentjs hour, minute, second, or millisecond tokens](https://momentjs.com/docs/#/parsing/string-format/).

The related fields will be displayed in the order that they are listed.

The example below shows a time selector component with just hours and minutes.

<Demos::PowerDatepickerExampleThreeA />

## With time selector using 12 hour format

If `h` or `hh` is passed as the hour format for the time selector component, the hour input will accept values from 1 - 12, and an AM/PM input will be shown as well.

The AM/PM input can be updated wither by typing in the input, or using arrow up to select AM or arrow down to select PM.

<Demos::PowerDatepickerExampleFour />

## With a different display format from the underlying date value format

It is possible pass `dateTimeDisplayFormat` to have a different display format in the datetime trigger input, to the underlying date format specified by `dateTimeFormat`.

In this case, the field value will still be formattd according to `dateTimeFormat`. `dateTimeFormat` will still be the format which will be used by momentjs to parse any dates being passed to the field, wither by setting `defaultValue` on the field,or if it is passed as past of the `data` object to the `changesetWebform` component.

This could be useful where your server requires one date format, but your users would expect another format.

<Demos::PowerDatepickerExampleFive />

## Styling the close and calendar icons

Example styling to add a gray calendar icon to the component when no date is selected, and a more attractive cross icon which shows when there is a value.

<DocsSnippet @name="styling-close-button-and-calendar-icons.scss" />
