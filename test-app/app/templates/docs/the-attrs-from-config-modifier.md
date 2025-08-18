# The `attrs-from-config` modifer

Many of the componets and elements in a ChangesetWebform component are invoked with the `{{attrs-from-config}}` modifier. In each case, the modifier is invoked with one more name spaces.

The example below shows how the modifier is invoked on the input element of an input field. It has two namespaces, `inputElement` and `inputField`.

- `inputElement` is applied to all input elements in all fields.
- `inputField` is only applied to the input element in the input field.

```javascript
<input
  {{attrs-from-config "inputElement,inputField" @changesetWebform @formField}}
  ...
  >
```

Using these namespaces, we can configure the class names that should be added to the element, or use functions to manipulate the rendered element directly. This is done via the `attrsFromConfig` object, which can have two properties, `classNames` and `attrFunctions`.

Both `classNames` and `attrFunctions` are objects whose keys refer to the namespaces passed to the `attrs-from-config` modifier.

```javascript
attrsFromConfig: {
  classNames: {
    inputElement: ['input', 'padding-s'], // Will replace the inherited value of classNames.inputElement
    inputField: ['$inherited', '$validationClassNames', '$validationPseudoClasses', 'input-field'] // Will merge with the inherited value of classNames.inputElement, because `$inherited` is included.
  }
  attrFunctions: {
    inputElement(element, changesetWebform, formField, _classNameSettings) { // Will always replace the inherted value of attrFunctions.inputElement
      if (formField.fieldType === 'email') {
        element.classList.add('email-input');
      }
    }
  }
}
```

The example above

## Addon defaults

The addon implements defaults which can be found in the `attrsFromConfig` object at `./utils/addon-defaults.js`

In order to override these defaults, an `attrsFromConfig` object can included in the following places, listed in order of specificity.

At each level, the merged value of `attrsFromConfig` will be inherited, so you only need to include the parts that you would like to override.

### App wide scope

- `changesetWebformsDefaults.attrsFromConfig` in `services/ember-changeset-webforms.js` (Applied throuought the app wide config)
- Any of the field types `changesetWebformsDefaults.fieldTypes` in `services/ember-changeset-webforms.js` (Applied throuought the app wide config)

### Single instance scope

Here, `@formSchema` refers to the object whioch is passed to `@formSchema` property of the `ChangesetWebform` component.

- `@formSchema.attrsFromConfig` (Applied to a specific instance of a `ChangesetWebform` component)
- Any of the field types defined in `@formSchema.fieldSettings.fieldTypes` (Applied to all fields with the specified `fieldType`, within specific instance of a `ChangesetWebform` component)
- `field.attrsFromConfig` where field is the definition of a specidfic field in `@formSchema.fields`

## Configuring element class names

The addon provides fine grained control over the class names that are applied to the various elements which are rendered within the `ChangesetWebform` component.

This allows you to fit the markup of your forms to an existing CSS library without overriding any template files.

### Default class names

The snippet below shows the full list of configurable class names, as well the their internal defaults.

The value of each class name property must be an array or a function.

Each property name is chosen to indicate which element it targets.

These properties can be modified at the app, form and field level, as outlined below.

<DocsSnippet @name="configurable-classnames.js" @title="Internal class name defaults" />

### App level configuration

App wide class name settings can be set in the `ENV.changesetWebformsDefaults.classNames` object in `services/ember-changeset-webforms.js`.

For example, the snippet below would add the class `label-el` to all label elements rendered by the `ChangesetWebform` component.

<DocsSnippet @title="services/ember-changeset-webforms.js" @name="app-wide-classes.js" />

### App level configuration - field type specific

App wide class name settings for a specific type of field can be set by adding an object for the relevant field type `ENV.changesetWebformsDefaults.fieldTypes` array in `services/ember-changeset-webforms.js`. This object can then have a `classNames` array where class names can be set.

For example, the snippet below would add the class `radio-button-group-label` to label elements rendered in all `radioButtonGroup` fields throughout the app.

The {{this.fieldTypes.length}} built in fields have the following `fieldTypes`:

<ul>
{{#each this.fieldTypes as |fieldType|}}
  <code style="display: inline-block; margin: 0 20px 10px 0;">{{fieldType}}</code>
{{/each}}
</ul>

The two snippets from `services/ember-changeset-webforms.js` above, result in the following class names on the two label elements in the form below.

<Demos::FieldSettingsOverridden />

### Form level configuration

Class names can be customised within a single instance of a `ChangesetWebform` object.

This is achived via the `classNames` property of the form schema. These settings will then apply throughout the particular form.

This can technically also be achived using the `fieldSettings.classNames` property of the form schema, but this is not recommended.

<Demos::FormWideClassSettings />

### Form level configuration - field type specific

Class names can be customised within all fields of a certain type, which occur within a single instance of a `ChangesetWebform` object.

This is achived via the in the `classNames` property of `fieldSettings.fieldTypes` in the form schema.

These settings will then apply in every instance of the relevant field type, throughout the particular form.

<Demos::FieldTypeWithinFormSettings />

### Field level configuration

Class names can be customised for an individual form field using the `classNames` property of the relevant `field` object in `formSchema.fields`.

<Demos::FieldSpecificClassSettings />

### Inheriting vs overriding class names settings from higher levels

Include `$inherited` in the array of class names for an element as a placeholder for the class names inherited from the next level up.

<Demos::InheritClassSettings />

Alternatively, exclude `$inherited` in order to completely override the value.

Note that the class `form-label` is still included. This is because it is included via the `fieldLabel` property, and it is the `labelElement` property which has been overridden.

<Demos::OverrideClassSettings />

### Including dynamic validation class names

The class names applied to elements as a result of wither passing or failing validation are defined in the `validClassNames` and `invalidClassNames` properties respectively. The defaults are `is-valid` and `is-invalid`.

You may wish to customise which elements within a form field receive those classes once a field has been validated. This can be done by adding `$validationClassNames` as an class name for any element which should receive those class names.

<Demos::ValidationClassSettings />

### Enabling the :valid and :invalid pseudo classes with `$validationPseudoClasses`

If `$validationPseudoClasses` is one of the items in the array of class names, _and_ the element in question is a form element, then the `data-set-custom-validity` attribute will set to `true` on the element.

As a result, whenever the field is validated, all elements within that field with `data-set-custom-validity=true` will have their [`setCustomValidity`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity) method called with any validation errors. This allows the browser to add the `:valid` or `:invalid` pseudo classes to the elements as appropriate.

<Docs::ShowClasses />

## Manipulting DOM attrs with a function

If you would one or more class names for an element to be dynamic, you can add a method to the `classNames` object to manipulate the final array of class names for a particular class name property.

The name of the method should be the the property name with `Fn` appended. For example the methos at `classNames.submitButtonFn` will be applied to the classes for the `submitButton` property. It must return an array of strings.

- `element` => the DOM element
- `changesetWebform` => the changesetWebform instance.
- `formField` => the relevant form field object, where the relevant element is within a form field.
- `classNameSettings` => the merged class name settings as they apply to an instance of changesetWebform or a form field.

The example below removes the class `btn-primary` adds the class `btn-success` to the submit button if `formSettings.requestInFlight` is true. This results in a green background.

Note that what you return from the method will completely override the class name settings for the property.

If you would like to keep those classes, then always include the contents of the first argument (`classNamesArray`) in the response.

The method will be run each time the `class-names-from-config` helper is instered or updated in the relevant template. As it receives `changesetWebform` and `formField` as arguments, this will occur whenever a getter or tracked property is updated on opne of those to class instances.

<Demos::AttrFunctions />

```

```
