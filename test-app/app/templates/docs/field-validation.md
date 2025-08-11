# Field validation

## Integrating validator functions

Validator functions need to be included in an instance of a changesetWebform before the corresponding validation rule will work.

### Importing all of the default validators

The full set of default validators shipped by [Ember Changeset Validations](https://github.com/adopted-ember-addons/ember-changeset-validations) can be imported as below.

<DocsSnippet @name="import-default-validators.js" @title="Importing the default validator functions" />

### Importing a subset of default validators

Note that we can also import a subset of validations, if we don't intend on using all of the default ones, and we'd prefer to avoid importing validators that we don't need.

The snippet below shows the full set of default validators imported in `ember-changeset-webforms/utils/default-validators` (Used above).
Rather than importing the default validators, we could import a subset of those shown below, directly from `ember-changeset-webforms`.

<DocsSnippet @name="ember-changeset-validations-default-validators.js" @title="The full set of default validators" />

### Importing custom validators

Custom validators can be imported from anywhere. See <LinkTo @route="docs.integrating-custom-validators">Integrating custom validators</LinkTo>

### Integrating validator functions app wide

Validators can be added at the app wide level in `services/ember-changeset-webfornms.js` as below. We first import the validators in the service as above and then add them to the `changesetWebformsDefaults` object as below.

<DocsSnippet @name="app-wide-validators.js" @title="Including validators app wide" />

This would result in all of the default validators being available in all `changesetWebform` instances throughout our app.

### Integrating validator functions in an individual form

The example component below shows how the custom `phoneNumber` validator can be imported and then made available to the `changesetWebform` instance, by including it in `formSchema.validations`.

Note that if you've specified app wide validators, as in the above example, those will still be available to this `changesetWebform` instance. This is why `validatePresence` still works, even though it is not included in `formSchema.validations`.

<Demos::CustomFieldUsage />

## Validation events

Under the hood, each field has an `eventLog` and `validatesOn` property, both of which are arrays of event name strings.

Items are added to the `eventLog` array in response to various events, such as insertion of a field into the DOM, form submission, value updates, focussing out of inputs, and many others. Note that these are not limited the the names of actual browser events.

The `validatesOn` property defines which events should enable validation for a field.

If there is any intersection between the `eventLog` and `validatesOn` arrays, validation is enabled for a field and it will be revalidated whenever it's value is updated, or the form is submitted.

This means that by updating the `validatesOn` property of a field, you can control which events trigger the validation of a field.

For example, when a field is inserted into the DOM with a value, `insertWithValue` is added to the `eventLog` array of the relevant field. Thus, if you add `insertWithValue` to the `validatesOn` array, the field will validate when inserted into the DOM, provided that it is inserted with a value.

The example below shows how you can trigger validation in customised ways by adding an event string to the `validatesOn` array of a field, and then pushing the same string into the `eventLog` array of the field when it should be validated.

Cliking the "Update value of name field" button updates the value of the name field, and validates the field.

<Demos::FieldMethodsExampleFive />

### The `alwaysValidateOn` property

Most use cases will require that certain events always trigger validation on all fields, or at least all fields of a certain type. For example it is common that:

- clicking the submit button triggers validation on all fields, and
- focussing out of an input field will always trigger validation on that field.

Assuming this is the desired behaviour, it would be needlessly repetitive to have to populate the `validatesOn` array with events such as `submit` for all fields and `focusOut` for all `input` fields.

For this reason, the addon defines an `alwaysValidateOn` in `fieldSettings` (Applicable to all fields), as well as each type of field. These defaults are shown below.

<InterpolatedSimpleJsSnippet @object={{this.fieldSettingsValidateOnString}} @title="Addon defaults for alwaysValidateOn" />

It is important to note the use of `$inherited` in field types. This causes the relevant `validatesOn` array to inherit the values from the `validatesOn` array in `fieldSettings`. Thus, `submit` is added to the `validatesOn` array for each field type.

### Overriding `alwaysValidateOn`

The addon defaults outlined above can be overridden at the app level, or within a particular form schema. See [http://localhost:6200/docs/configuration-options](http://localhost:6200/docs/configuration-options).

## Defining validation rules

This addon uses [Ember Changeset Validations](https://github.com/poteto/ember-changeset-validations) to handle validation, and also as its default library of validators.

The [Ember Changeset Validations usage documentation](https://github.com/poteto/ember-changeset-validations#usage) outlines how you create a validation map and then pass that map to the changeset generator, so that the validations are integrated into your changeset.

With **Ember Changeset Webforms** the importing of the validations library, construction of the validations map and creation of the changeset are handled for you.

You need only specify the validations that you'd like to apply to each field in the `validationRules` array.

Each item in a field's `validationRules` array is an object that must contain a `validationMethod` property, which must correspond to a validation rule in the [Ember Changeset Validations validator api](https://github.com/poteto/ember-changeset-validations#validator-api), or any custom validators that you have written (More on custom validators below).

Each item in a field's `validationRules` array may also include an `arguments` property, where you can pass the arguments relevant to the validator specified by the `validationMethod`.

Thus, the code below taken from the [Ember Changeset Validations usage docs](https://github.com/poteto/ember-changeset-validations#usage) on create a validations map:

```javascript
  firstName: [
    validatePresence(true),
    validateLength({ min: 4 })
  ],
```

would be expressed as the below when defining a formSchema for the changeset-webform component.

```javascript
validationRules: [
  {
    validationMethod: 'validatePresence',
    arguments: true,
  },
  {
    validationMethod: 'validateLength',
    arguments: { min: 4 },
  },
];
```

## Setting custom validity on DOM elements

Browsers will automatically apply the `valid` and `invalid` pseudo classes to form elements where appropriate. For example, if an input field with `type=email` is updated with an invalid email address, the input will then have the `invalid` pseudo class, and will be selectable with `:invalid`.

DOM elements have a built in `setCustomValidity` method

See [https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity](https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity)

`data-set-custom-validity`

## Example

<Demos::SignupForm />
