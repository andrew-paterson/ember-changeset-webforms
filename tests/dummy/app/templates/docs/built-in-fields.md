

The value of a field will set the property in the underlying changeset at the path defined as `propertyName` or `fieldId`.

## Input

Renders an HTML input. 

Calls the `keyUp`, `focusIn` and `focusOut` actions when the corresponding events occur.

### Input field props

<DocsSnippet @name="input-field-options.js" />

The above props are in addition to the generic field props shown with their default values below.

{{docs-snippet name="generic-field-settings.js" title="Default generic field settings and their values"}}


<DocsDemo as |demo|>
  <demo.example @name="input-example-1.hbs">
    <ChangesetWebform @formSchema={{this.inputExample1FormSchema}} 
    @onUserInteraction={{action "onUserInteraction" }}/>
  </demo.example>
  <demo.snippet @name="input-example-1.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="input-example-1.hbs" @label="Template" @language="htmlbars" />
</DocsDemo>

<DocsDemo as |demo|>
  <demo.example @name="input-example-2.hbs">
    <ChangesetWebform @formSchema={{this.inputExample2FormSchema}} />
  </demo.example>
  <demo.snippet @name="input-example-2.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="input-example-2.hbs" @label="Template" @language="htmlbars" />
</DocsDemo>

## Textarea

Renders an HTML textarea. 

Calls the `keyUp`, `focusIn` and `focusOut` actions when the corresponding events occur.

### Textarea field props

<DocsSnippet @name="textarea-field-options.js" />

The above props are in addition to the generic field props shown with their default values below.

{{docs-snippet name="generic-field-settings.js" title="Default generic field settings and their values"}}


<DocsDemo as |demo|>
  <demo.example @name="textarea-example-1.hbs">
    <ChangesetWebform @formSchema={{this.textareaExample1FormSchema}} />
  </demo.example>
  <demo.snippet @name="textarea-example-1.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="textarea-example-1.hbs" @label="Template" @language="htmlbars" />
</DocsDemo>
## Single checkbox

Renders a single checkbox with a label.

The field ID is set to `true` or `false` depending on whether the checkbox is checked or not.

### Single checkbox props

<DocsSnippet @name="singleCheckbox-field-options.js" />

The above props are in addition to the generic field props shown with their default values below.

{{docs-snippet name="generic-field-settings.js" title="Default generic field settings and their values"}}


### Single checkbox basic usage

<DocsDemo as |demo|>
  <demo.example @name="single-checkbox-example-1.hbs">
    <div data-test-id="single-checkbox-basic-use">
      <ChangesetWebform @formSchema={{this.singleCheckboxExample1FormSchema}} />
    </div>

  </demo.example>
  <demo.snippet @name="single-checkbox-example-1.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="single-checkbox-example-1.hbs" @label="Template" @language="htmlbars" />
</DocsDemo>

### Single checkbox markdown checkbox label

You can also pass a markdown string to the `checkboxLabelMarkdown` prop. This will bne rendered as HTML inside a `label` element.

<DocsDemo as |demo|>
  <demo.example @name="single-checkbox-example-2.hbs">
    <div data-test-id="single-checkbox-markdown-label">
      <ChangesetWebform @formSchema={{this.singleCheckboxExample2FormSchema}} />
    </div>

  </demo.example>
  <demo.snippet @name="single-checkbox-example-2.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="single-checkbox-example-2.hbs" @label="Template" @language="htmlbars" />
</DocsDemo>

### Single checkbox custom component for checkbox label

You can use a custom component for the checkbox label by passing `checkBoxLabelComponent` to the field. The component passed will then be rendered in place of the standard label element for each option.

The object passed must take the following form.

``` 
{ 
  path: // String, required. The path to the component to render', 
  props: // Object, optional. This object that will be passed to the component as "props"
}
```

* The component will also have access to an `option` prop, with the data for that option.
* The component will also have access to the `checkboxId` property. Set the label elements `for` attribute to this value to match it to the related checkbox.

<DocsDemo as |demo|>
  <demo.example @name="single-checkbox-example-3.hbs">
    <div data-test-id="single-checkbox-component-label">
      <ChangesetWebform @formSchema={{this.singleCheckboxExample3FormSchema}} />
    </div>

  </demo.example>
  <demo.snippet @name="single-checkbox-example-3.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="single-checkbox-example-3.hbs" @label="Template" @language="htmlbars" />
</DocsDemo>

## Radio button group

Renders a radio button group. The value of the field as a whole is the `value` property of the currently selected option.

### Radio button group props

<DocsSnippet @name="radioButtonGroup-field-options.js" />

The above props are in addition to the generic field props shown with their default values below.

{{docs-snippet name="generic-field-settings.js" title="Default generic field settings and their values"}}


### Radio button group `options` prop

Each option in the `options` property of field with type `radioButtonGroup` can have the following properties.

<DocsSnippet @name="radio-button-group-option.js" />

The above props are in addition to the generic field props shown with their default values below.

{{docs-snippet name="generic-field-settings.js" title="Default generic field settings and their values"}}


<DocsDemo as |demo|>
  <demo.example @name="radio-button-group-example-1.hbs">
    <ChangesetWebform @formSchema={{this.radioButtonGroupExample1FormSchema}} />
  </demo.example>
  <demo.snippet @name="radio-button-group-example-1.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="radio-button-group-example-1.hbs" @label="Template" @language="htmlbars" />
</DocsDemo>

### Custom components for Radio button group options

When using a custom component for option labels, either by:

* passing `optionLabelComponent` to the field. The component passed will then be rendered in place of the standard label element for each option.
* by passing `labelComponent` to a specific option. The component passed will then be rendered in place of the standard label element for that specific option, and will override `optionLabelComponent`.

In both cases the following applies, the object passed must take the following form.

``` 
{ 
  path: // String, required. The path to the component to render', 
  props: // Object, optional. This object that will be passed to the component as "props"
}
```

* The component will also have access to an `option` prop, with the data for that option.
* The component will also have access to the `radioId` property. Set the label elements `for` attribute to this value to match it to the related checkbox.

<DocsDemo as |demo|>
  <demo.example @name="radio-button-group-example-2.hbs">
    <ChangesetWebform @formSchema={{this.radioButtonGroupExample2FormSchema}} />
  </demo.example>
  <demo.snippet @name="radio-button-group-example-2.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="radio-button-group-example-2.hbs" @label="Template" @language="htmlbars" />
</DocsDemo>

## Checkbox group

Renders a checkbox group. The value of the field as a whole is an array which will include the value of `key` for each option that is currently selected.

<DocsSnippet @name="checkboxGroup-field-options.js" />

The above props are in addition to the generic field props shown with their default values below.

{{docs-snippet name="generic-field-settings.js" title="Default generic field settings and their values"}}


### Checkbox group options

Each option in the `options` property of field with type `checkboxGroup` can have the following properties.

<DocsSnippet @name="checkbox-group-option.js" />

The above props are in addition to the generic field props shown with their default values below.

{{docs-snippet name="generic-field-settings.js" title="Default generic field settings and their values"}}


<DocsDemo as |demo|>
  <demo.example @name="checkbox-group-example-1.hbs">
    <ChangesetWebform @formSchema={{this.checkboxGroupExample1FormSchema}} />
  </demo.example>
  <demo.snippet @name="checkbox-group-example-1.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="checkbox-group-example-1.hbs" @label="Template" @language="htmlbars" />
</DocsDemo>

### Custom components for Checkbox group options

When using a custom component for option labels, either by:

* passing `optionLabelComponent` to the field. The component passed will then be rendered in place of the standard label element for each option.
* by passing `labelComponent` to a specific option. The component passed will then be rendered in place of the standard label element for that specific option, and will override `optionLabelComponent`.

In both cases the following applies, the object passed must take the following form.

``` 
{ 
  path: // String, required. The path to the component to render', 
  props: // Object, optional. This object that will be passed to the component as "props"
}
```

* The component will also have access to an `option` prop, with the data for that option.
* The component will also have access to the `checkboxId` property. Set the label elements `for` attribute to this value to match it to the related checkbox.

<DocsDemo as |demo|>
  <demo.example @name="checkbox-group-example-2.hbs">
    <ChangesetWebform @formSchema={{this.checkboxGroupExample2FormSchema}} />
  </demo.example>
  <demo.snippet @name="checkbox-group-example-2.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="checkbox-group-example-2.hbs" @label="Template" @language="htmlbars" />
</DocsDemo>

<DocsSnippet @name="clicker-field-options.js" />

The above props are in addition to the generic field props shown with their default values below.

{{docs-snippet name="generic-field-settings.js" title="Default generic field settings and their values"}}


## Static content field

This field can be used to static content in a form. It has no action handlers.

If static text is sufficient, you can simply use the `text` prop to pass the static text to display, and the `textElement` prop to specify what element the text should be wrapped in.

`textElementClass` can also be set to a string of class names to be added to the text element.

<DocsDemo as |demo|>
  <demo.example @name="static-content-example-1.hbs">
    <div data-test-id="static-content-basic-use">
      <ChangesetWebform @formSchema={{this.staticContentExample1FormSchema}} />
    </div>
  </demo.example>
  <demo.snippet @name="static-content-example-1.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="static-content-example-1.hbs" @label="Template" @language="htmlbars" />
</DocsDemo>

### Static content field with custom content component

<DocsDemo as |demo|>
  <demo.example @name="static-content-example-2.hbs">
    <div data-test-id="static-content-custom-content-component">
      <ChangesetWebform @formSchema={{this.staticContentExample2FormSchema}} />
    </div>
  </demo.example>
  <demo.snippet @name="static-content-example-2.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="static-content-example-2.hbs" @label="Template" @language="htmlbars" />
</DocsDemo>

Alternatively, you can pass `

<DocsSnippet @name="staticContent-field-options.js" />

The above props are in addition to the generic field props shown with their default values below.

{{docs-snippet name="generic-field-settings.js" title="Default generic field settings and their values"}}


## Power select

Renders an [ember-power-select](https://ember-power-select.com) component.

### Power select field props

<DocsSnippet @name="powerSelect-field-options.js" />

The above props are in addition to the generic field props shown with their default values below.

{{docs-snippet name="generic-field-settings.js" title="Default generic field settings and their values"}}


Note also that if passed, value of `placeholder` will display as the placeholder in the select box until an option is selected.

### Power select where options is an array of strings

<DocsDemo as |demo|>
  <demo.example @name="power-select-example-1.hbs">
    <ChangesetWebform @formSchema={{this.powerSelectExample1FormSchema}} />
  </demo.example>
  <demo.snippet @name="power-select-example-1.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="power-select-example-1.hbs" @label="Template" @language="htmlbars" />
</DocsDemo>

### Power select where options is an array of objects

Where an array of objects is passed to `options`, `optionDisplayProp` must be set to tell the power select component which property to use as the display for both the options in the list, the display of the selected item and the propertuy to target when searching the list.

In the example below, the user only sees the country names, but the value of the field will be set to an object with the country ID and name when a country is selcted.

<DocsDemo as |demo|>
  <demo.example @name="power-select-example-2.hbs">
    <ChangesetWebform @formSchema={{this.powerSelectExample2FormSchema}} />
  </demo.example>
  <demo.snippet @name="power-select-example-2.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="power-select-example-2.hbs" @label="Template" @language="htmlbars" />
</DocsDemo>

### Power select with custom components for the options and selected item

In this scenario, we want the actual value of the field to be the 3 letter country code, but we want only ever want user to see the full country name. 

We thus pass an array of country code strings as options, but then use custom components for the selected item and options to show the full country name for each ID.

When the user clicks a country name, the value of the field will be set to the 3 letter id.

<DocsDemo as |demo|>
  <demo.example @name="power-select-example-3.hbs">
    <ChangesetWebform @formSchema={{this.powerSelectExample3FormSchema}} />
  </demo.example>
  <demo.snippet @name="power-select-example-3.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="power-select-example-3.hbs" @label="Template" @language="htmlbars" />
</DocsDemo>
### Power select with multiple selection

Passing `multipleSelection: true` will render a [Power select multiple component](https://ember-power-select.com/docs/multiple-selection).

<DocsDemo as |demo|>
  <demo.example @name="power-select-multiple-example-1.hbs">
    <div data-test-id="power-select-multiple-selector-example-1">
      <ChangesetWebform @formSchema={{this.powerSelectMultipleExample1FormSchema}} />
    </div>
  </demo.example>
  <demo.snippet @name="power-select-multiple-example-1.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="power-select-multiple-example-1.hbs" @label="Template" @language="htmlbars" />
</DocsDemo>
## Power datepicker

Displays an input which shows the current selected date or datetime. When the input is focussed, a dropdown shows, including an [Ember Power Calendar](https://ember-power-calendar.com) component, and optionally a time selection component below that. 

The datetime can be updated by simply editing the string in the trigger input, or bu using the calendar component, and the time selector component is it is shown. 

The `dateTimeFormat` option is important. This is the format which will be used by momentjs to parse any dates being passed to the field, wither by setting `defaultValue` on the field,or if it is passed as past of the `data` object to the `changesetWebform` component. 

The value output by this field will also always be a formatted according to this format.

### Power datepicker field props

<DocsSnippet @name="powerDatePicker-field-options.js" />

The above props are in addition to the generic field props shown with their default values below.

{{docs-snippet name="generic-field-settings.js" title="Default generic field settings and their values"}}


### defaultValue

`defaultValue` can be passed as a native JavaScript date object, a `moment` object, or a string in the format of `dateTimeFormat`.

When the field is inersted, it will parse the supplied datetime into the format of the fields `dateTimeFormat` property, and set the value of the field to the resulting string.

### Basic usage - date only selection

<DocsDemo as |demo|>
  <demo.example @name="power-datepicker-example-1.hbs">
    <div data-test-id="power-datepicker-basic-use">
      <FormattedDatetimes @data={{this.dateTimeOutput1}} />
      <ChangesetWebform 
        @formSchema={{this.powerDatapickerExample1FormSchema}}
        @onFieldValueChange={{action "afterDatetimeUpdated" "1"}} />
    </div>
  </demo.example>
  <demo.snippet @name="power-datepicker-example-1.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="power-datepicker-example-1.hbs" @label="Template" @language="htmlbars" />
  <demo.snippet @name="after-datetime-updated-action.js" @label="Action handing" @language="javascript" />
</DocsDemo>



### With fixed time

`fixedTime` can be passed in the format `HH:mm:ss.SSS`. When present, the time portion of the field values will be fixed to this value.

Note that setting `showTimeSelector` to`true` will have no effect if `fixedTime` is passed.

<DocsDemo as |demo|>
  <demo.example @name="power-datepicker-example-1b.hbs">
    <div data-test-id="power-datepicker-advanced-use">
      <FormattedDatetimes @data={{this.dateTimeOutput1b}} />
      <ChangesetWebform 
        @formSchema={{this.powerDatapickerExample1bFormSchema}}
        @onFieldValueChange={{action "afterDatetimeUpdated" "1b"}} />
    </div>
  </demo.example>
  <demo.snippet @name="power-datepicker-example-1b.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="power-datepicker-example-1b.hbs" @label="Template" @language="htmlbars" />
  <demo.snippet @name="after-datetime-updated-action.js" @label="Action handing" @language="javascript" />
</DocsDemo>

### With minDate and maxDate

`minDate` and `maxDate` can both be passed in order to set the earliest and latest allowed dates respectively. In the calendar component, all dates before `minDate` or after `maxDate` will be disabled. 

If the user types a date into the trigger input which is before `minDate` or after `maxDate`, then when the `onChnage` event fires, the value will be ignored and the trigger will be reset to its previous value.

<DocsDemo as |demo|>
  <demo.example @name="power-datepicker-example-1c.hbs">
    <div data-test-id="power-datepicker-min-max-date">
      <FormattedDatetimes @data={{this.dateTimeOutput1c}} />
      <ChangesetWebform 
        @formSchema={{this.powerDatapickerExample1cFormSchema}}
        @onFieldValueChange={{action "afterDatetimeUpdated" "1c"}} />
    </div>
  </demo.example>
  <demo.snippet @name="power-datepicker-example-1c.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="power-datepicker-example-1c.hbs" @label="Template" @language="htmlbars" />
  <demo.snippet @name="after-datetime-updated-action.js" @label="Action handing" @language="javascript" />
</DocsDemo>

### With time selector using default units

If `showTimeSelector` is `true` then by default a series of inputs will be shown for time selection, based on a 24 hours clock with hours, minutes, seconds and milliseconds.

All inputs can be updated either by typing numbers, or by using the arrow keys. 

* An arrow key on its own increments the value by 1.
* An arrow key + `Shift` increments the value by 10.
* An arrow key + `Ctrl` + `Shift` increments the value by 100.

If the user input exceeds the maximum value for the relevant time unit, the value will be forcibly set to the maximum value. 

If the user input is lower than the minimum value for the relevant time unit, the value will be forcibly set to the minimum value. 

<DocsDemo as |demo|>
  <demo.example @name="power-datepicker-example-3.hbs">
    <div data-test-id="power-datepicker-24-hour-time-select">
      <FormattedDatetimes @data={{this.dateTimeOutput3}} />
      <ChangesetWebform 
        @formSchema={{this.powerDatapickerExample3FormSchema}}
        @onFieldValueChange={{action "afterDatetimeUpdated" "3"}} />
    </div> 
  </demo.example>
  <demo.snippet @name="power-datepicker-example-3.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="power-datepicker-example-3.hbs" @label="Template" @language="htmlbars" />
  <demo.snippet @name="after-datetime-updated-action.js" @label="Action handing" @language="javascript" />
</DocsDemo>

### With time selector using custom format

`timeSelectorFields` can be passed as a comma separated string of [valid momentjs hour, minute, second, or millisecond tokens](https://momentjs.com/docs/#/parsing/string-format/).

The related fields will be displayed in the order that they are listed.

The example below shows a time selector component with just hours and minutes.

<DocsDemo as |demo|>
  <demo.example @name="power-datepicker-example-3a.hbs">
    <div data-test-id="power-datepicker-custom-time-select">
      <FormattedDatetimes @data={{this.dateTimeOutput3a}} />
      <ChangesetWebform 
        @formSchema={{this.powerDatapickerExample3aFormSchema}}
        @onFieldValueChange={{action "afterDatetimeUpdated" "3a"}} />
    </div> 
  </demo.example>
  <demo.snippet @name="power-datepicker-example-3a.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="power-datepicker-example-3a.hbs" @label="Template" @language="htmlbars" />
  <demo.snippet @name="after-datetime-updated-action.js" @label="Action handing" @language="javascript" />
</DocsDemo>

### With time selector using 12 hour format

If `h` or `hh` is passed as the hour format for the time selector component, the hour input will accept values from 1 - 12, and an AM/PM input will be shown as well.

The AM/PM input can be updated wither by typing in the input, or using arrow up to select AM or arrow down to select PM.

<DocsDemo as |demo|>
  <demo.example @name="power-datepicker-example-4.hbs">
    <div data-test-id="power-datepicker-12-hour-time-select">
      <FormattedDatetimes @data={{this.dateTimeOutput4}} />
      <ChangesetWebform 
        @formSchema={{this.powerDatapickerExample4FormSchema}}
        @onFieldValueChange={{action "afterDatetimeUpdated" "4"}} />
    </div>
  </demo.example>
  <demo.snippet @name="power-datepicker-example-4.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="power-datepicker-example-4.hbs" @label="Template" @language="htmlbars" />
  <demo.snippet @name="after-datetime-updated-action.js" @label="Action handing" @language="javascript" />
</DocsDemo>

### With a different display format from the underlying date value format

It is possible pass `dateTimeDisplayFormat` to have a different display format in the datetime trigger input, to the underlying date format specified by `dateTimeFormat`. 

In this case, the field value will still be formattd according to `dateTimeFormat`. `dateTimeFormat` will still be the format which will be used by momentjs to parse any dates being passed to the field, wither by setting `defaultValue` on the field,or if it is passed as past of the `data` object to the `changesetWebform` component.  

This could be useful where your server requires one date format, but your users would expect another format.

<DocsDemo as |demo|>
  <demo.example @name="power-datepicker-example-5.hbs">
    <div data-test-id="power-datepicker-unusual-format">
      <FormattedDatetimes @data={{this.dateTimeOutput5}} />
      <ChangesetWebform 
        @formSchema={{this.powerDatapickerExample5FormSchema}}
        @onFieldValueChange={{action "afterDatetimeUpdated" "5"}}
       />
    </div> 
  </demo.example>
  <demo.snippet @name="power-datepicker-example-5.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="power-datepicker-example-5.hbs" @label="Template" @language="htmlbars" />
  <demo.snippet @name="after-datetime-updated-action.js" @label="Action handing" @language="javascript" />
</DocsDemo>

## Clicker

The field displays an element which emits the `onUserInteraction` action with the eventType `click` when clicked. You can bind this to an action in your component and then respond in any way.

The examples below toggle the advanced field in a form.

### Clicker field basic usage

Pass `clickerText` and optionally `clickerElementClassNames`.

Renders a `div` element with `role="button"` the classNames provided. The inner text of the element is what is passed to `clickerText`.

<DocsDemo as |demo|>
  <demo.example @name="clicker-example-1.hbs">
    <div data-test-id="clicker-example-1">
      <ChangesetWebform 
        @formSchema={{this.clickerExample1FormSchema}} 
        @onUserInteraction={{action "onUserInteractionClicker1"}}/>
    </div> 
  </demo.example>
  <demo.snippet @name="clicker-example-1.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="clicker-example-1.hbs" @label="Template" @language="htmlbars" />
  <demo.snippet @name="clicker-example-action.js" @label="Action handing" @language="javascript" />
</DocsDemo>

### Clicker field with a custom component

You can use a custom component for the checkbox label by passing `displayComponent` to the field. The component passed will then be rendered in place of the standard clicker component.

The object passed must take the following form.

``` 
{ 
  path: // String, required. The path to the component to render', 
  props: // Object, optional. This object that will be passed to the component as "props"
}
```

* The component will also have access to an `formField` prop, with the formField object.
* The component will also have access to the `clickerElementClass` property. These are the classnames that would be applied to the standard clicker element, derived by resolving th default class names for the field, with any overrides provided.
* The component will also have access to the `changesetWebform` object, which is contains the form settings, form fields and underlying changeset.

Pass `displayComponent` as an object containing:

* `path` - the path to the component to render
* `props`

If using a `button` element in your custom clicker component, bear in mind that the default `type` of a button is `submit`. Thus, if you don't add a type to your button, clicking it will result in a form submission. Setting `type="button"` is recommended.

{{#docs-snippet name="custom-clicker-component.hbs"}}
<button data-test-class="cwf-clicker-element" type="button" onclick={{action this.onClick}} class={{this.classNames}}><b>{{this.formField.clickerText}}</b> {{component this.icon}}</button>
{{/docs-snippet}}

<DocsDemo as |demo|>
  <demo.example @name="clicker-example-2.hbs">
    <div data-test-id="clicker-example-2">
      <ChangesetWebform 
        @formSchema={{this.clickerExample2FormSchema}} 
        @onUserInteraction={{action "onUserInteractionClicker1"}}/>
    </div> 
  </demo.example>
  <demo.snippet @name="clicker-example-2.js" @label="Component JS" @language="javascript" />
  <demo.snippet @name="clicker-example-2.hbs" @label="Template" @language="htmlbars" />
  <demo.snippet @name="clicker-example-action.js" @label="Action handing" @language="javascript" />
  <demo.snippet @name="custom-clicker-component.js" @label="Custom clicker JS" @language="javascript" />
  <demo.snippet @name="custom-clicker-component.hbs" @label="Custom clicker HBS" @language="htmlbars" />
</DocsDemo>