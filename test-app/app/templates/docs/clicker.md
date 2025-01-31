# Clicker

The field displays an element which emits the `onUserInteraction` action with the eventName `click` when clicked. You can bind this to an action in your component and then respond in any way.

The examples below toggle the advanced field in a form.

## Clicker field basic usage

Pass `clickerText` and optionally `clickerElementClassNames`.

Renders a `div` element with `role="button"` the classNames provided. The inner text of the element is what is passed to `clickerText`.

<Forms::ClickerExampleOneFormSchema />

## Clicker field with a custom component

You can use a custom component for the checkbox label by passing `displayComponent` to the field. The component passed will then be rendered in place of the standard clicker component.

The object passed must take the following form.

```
{
  path: // String, required. The path to the component to render',
  props: // Object, optional. This object that will be passed to the component as "props"
}
```

- The component will also have access to an `formField` prop, with the formField object.
- The component will also have access to the `clickerElementClass` property. These are the classnames that would be applied to the standard clicker element, derived by resolving th default class names for the field, with any overrides provided.
- The component will also have access to the `changesetWebform` object, which is contains the form settings, form fields and underlying changeset.

Pass `displayComponent` as an object containing:

- `path` - the path to the component to render
- `props`

If using a `button` element in your custom clicker component, bear in mind that the default `type` of a button is `submit`. Thus, if you don't add a type to your button, clicking it will result in a form submission. Setting `type="button"` is recommended.

{{#docs-snippet name="custom-clicker-component.hbs"}}
<button data-test-class="cwf-clicker-element" type="button" {{on "click" this.onClick}} class={{this.classNames}}><b>{{this.formField.clickerText}}</b> {{component this.icon}}</button>
{{/docs-snippet}}

<Forms::ClickerExampleTwoFormSchema />
