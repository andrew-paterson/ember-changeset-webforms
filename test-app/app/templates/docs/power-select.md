# Power select

Renders an [Ember Power Select](https://ember-power-select.com) component.

Note that you must [install Ember Power Select](https://ember-power-select.com/docs/installation).

You will also need to ensure that the styles for the Power Select componenent are loaded. See [these docs](https://ember-power-select.com/docs/styles).

## Power select field props

<DocsSnippet @name="powerSelect-field-options.js" />

The above props are in addition to the generic field props shown with their default values below.

{{docs-snippet name="generic-field-settings.js" title="Default generic field settings and their values"}}

Note also that if passed, value of `placeholder` will display as the placeholder in the select box until an option is selected.

## Power select where options is an array of strings

<Demos::PowerSelectExampleOne />

## Power select where options is an array of objects

Where an array of objects is passed to `options`, `optionDisplayProp` must be set to tell the power select component which property to use as the display for both the options in the list, the display of the selected item and the propertuy to target when searching the list.

In the example below, the user only sees the country names, but the value of the field will be set to an object with the country ID and name when a country is selcted.

<Demos::PowerSelectExampleTwo />

## Power select with custom components for the options and selected item

In this scenario, we want the actual value of the field to be the 3 letter country code, but we want only ever want user to see the full country name.

We thus pass an array of country code strings as options, but then use custom components for the selected item and options to show the full country name for each ID.

When the user clicks a country name, the value of the field will be set to the 3 letter id.

<Demos::PowerSelectExampleThree />

## Power select with multiple selection

Passing `multipleSelection: true` will render a [Power select multiple component](https://ember-power-select.com/docs/multiple-selection).

<Demos::PowerSelectMultipleExampleOne />
