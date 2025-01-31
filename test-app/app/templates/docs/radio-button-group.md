# Radio button group

Renders a radio button group. The value of the field as a whole is the `value` property of the currently selected option.

## Radio button group props

<DocsSnippet @name="radioButtonGroup-field-options.js" />

The above props are in addition to the generic field props shown with their default values below.

{{docs-snippet name="generic-field-settings.js" title="Default generic field settings and their values"}}

## Radio button group `options` prop

Each option in the `options` property of field with type `radioButtonGroup` can have the following properties.

<DocsSnippet @name="radio-button-group-option.js" />

The above props are in addition to the generic field props shown with their default values below.

{{docs-snippet name="generic-field-settings.js" title="Default generic field settings and their values"}}

## Basic usage

<Demos::RadioButtonGroupExampleOne />

## Custom components for Radio button group options

When using a custom component for option labels, either by:

- passing `optionLabelComponent` to the field. The component passed will then be rendered in place of the standard label element for each option.
- by passing `labelComponent` to a specific option. The component passed will then be rendered in place of the standard label element for that specific option, and will override `optionLabelComponent`.

In both cases the following applies, the object passed must take the following form.

```
{
  path: // String, required. The path to the component to render',
  props: // Object, optional. This object that will be passed to the component as "props"
}
```

- The component template will have access to the `{{@checked}}` boolean as well as the `{{@option}}` hash which includes the `label` and `value` props for that option.
- Accessibility features
  - Set `for={{@for}}` on the label element, to ensure that the browser knows which radio button the label is for.
  - Set `id={{@labelId}}` so that the `aria-labelledby` attribute on the radio button works correctly.

<Demos::RadioButtonGroupExampleTwo />
