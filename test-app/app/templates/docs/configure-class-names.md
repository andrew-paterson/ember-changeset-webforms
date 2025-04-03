# Configuring element class names

The addon provides fine grained control over the class names that are applied to the various elements which are rendered within the `ChangesetWebform` component.

This allows you to fit the markup of your forms to an existing CSS library without overriding any template files.

## Default class names

The snippet below shows the full list of configurable class names, as well the their internal defaults.

The value of each class name property must be an array or a function.

Each property name is chosen to indicate which element it targets.

These properties can be modified at the app, form and field level, as outlined below.

<DocsSnippet @name="configurable-classnames.js" @title="Internal class name defaults" />

## App level configuration

App wide class name settings can be set in the `ENV.changesetWebformsDefaults.classNames` object in `services/ember-changeset-webforms.js`.

For example, the snippet below would add the class `label-el` to all label elements rendered by the `ChangesetWebform` component.

<DocsSnippet @title="services/ember-changeset-webforms.js" @name="app-wide-classes.js" />

## App level configuration - field type specific

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

## Form level configuration

Class names can be customised within a single instance of a `ChangesetWebform` object.

This is achived via the `classNames` property of the form schema. These settings will then apply throughout the particular form.

This can technically also be achived using the `fieldSettings.classNames` property of the form schema, but this is not recommended.

<Demos::FormWideClassSettings />

## Form level configuration - field type specific

Class names can be customised within all fields of a certain type, which occur within a single instance of a `ChangesetWebform` object.

This is achived via the in the `classNames` property of `fieldSettings.fieldTypes` in the form schema.

These settings will then apply in every instance of the relevant field type, throughout the particular form.

<Demos::FieldTypeWithinFormSettings />

## Field level configuration

Class names can be customised for an individual form field using the `classNames` property of the relevant `field` object in `formSchema.fields`.

<Demos::FieldSpecificClassSettings />

## Inheriting vs overriding class names settings from higher levels

Include `$inherited` in the array of class names for an element as a placeholder for the class names inherited from the next level up.

<Demos::InheritClassSettings />

Alternatively, exclude `$inherited` in order to completely override the value.

Note that the class `form-label` is still included. This is because it is included via the `fieldLabel` property, and it is the `labelElement` property which has been overridden.

<Demos::OverrideClassSettings />

## Including dynamic validation class names

The class names applied to elements as a result of wither passing or failing validation are defined in the `validClassNames` and `invalidClassNames` properties respectively. The defaults are `is-valid` and `is-invalid`.

You may wish to customise which elements within a form field receive those classes once a field has been validated. This can be done by adding `$validationClassNames` as an class name for any element which should receive those class names.

<Demos::ValidationClassSettings />

## Passing a function for dynamic class names

If you would one or more class names for an element to be dynamic, you can add a method to the `classNames` object to manipulate the final array of class names for a particular class name property.

The name of the method should be the the property name with `Fn` appended. For example the methos at `classNames.submitButtonFn` will be applied to the classes for the `submitButton` property. It must return an array of strings.

- `classNamesArray` => the final class names array for the corresponding property in the class name settings.
- `classNameSettings` => the full final class names object
- `changesetWebform` => the changesetWebform instance
- `formField` => the relevant form field object, where the relevant element is within a form field.

The example below removes the class `btn-primary` adds the class `btn-success` to the submit button if `formSettings.requestInFlight` is true. This results in a green background.

Note that what you return from the method will completely override the class name settings for the property.

If you would like to keep those classes, then always incldue the contents of the first argument (`classNamesArray`) in the response.

The method will be run each time the `dynamic-class-names` helper is instered or updated in the relevant template. As it receives `changesetWebform` and `formField` as arguments, this will occur whenever a getter or tracked property is updated on opne of those to class instances.

<Demos::ClassNamesFunction />

<Docs::ShowClasses />
