# Checkbox group

Renders a checkbox group. The value of the field as a whole is an array which will include the value of `key` for each option that is currently selected.

<DocsSnippet @name="checkboxGroup-field-options.js" />

The above props are in addition to the generic field props shown with their default values below.

{{docs-snippet name="generic-field-settings.js" title="Default generic field settings and their values"}}

## Checkbox group options

Each option in the `options` property of field with type `checkboxGroup` can have the following properties.

<DocsSnippet @name="checkbox-group-option.js" />

The above props are in addition to the generic field props shown with their default values below.

{{docs-snippet name="generic-field-settings.js" title="Default generic field settings and their values"}}

## Basic usage

<Demos::CheckboxGroupExampleOne />

## Custom components for Checkbox group options

When using a custom component for option labels, either by:

- passing `optionLabelComponent` to the field. The component passed will then be rendered in place of the standard label element for each option.
- by passing `labelComponent` to a specific option. The component passed will then be rendered in place of the standard label element for that specific option, and will override `optionLabelComponent`.

In both cases the following applies, the object passed must take the following form.

```
{
  componentClass: // Class, required. The imported class of the component to render.
  props: // Object, optional. This object that will be passed to the component as "props"
}
```

- The component template will have access to the `{{@checked}}` boolean as well as the `{{@option}}` hash which includes the `label`, `key`, and `onlyCheckedOption` props for that option.
- Accessibility features
  - Set `for={{@for}}` on the label element, to ensure that the browser knows which checkbox the label is for.
  - Set `id={{@labelId}}` so that the `aria-labelledby` attribute on the checkbox works correctly.

<Demos::CheckboxGroupExampleTwo />

<DocsSnippet @name="clicker-field-options.js" />

The above props are in addition to the generic field props shown with their default values below.

{{docs-snippet name="generic-field-settings.js" title="Default generic field settings and their values"}}
