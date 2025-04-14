# Field validation

## Validation events

Under the hood, each field has an `eventLog` and `validatesOn` property, both of which are arrays of event name strings.

Items are added to the `eventLog` array in response to various events, such as insertion of a field into the DOM, form submission, value updates, focussing out of inputs, and many others. Note that these are not limited the the names of actual browser events.

The `validatesOn` property defines which events should enable validation for a field.

If there is any intersection between the `eventLog` and `validatesOn` arrays, validation is enabled for a field and it will be revalidated whenever it's value is updated, or the form is submitted.

This means that by updating the `validatesOn` property of a field, you can control which events trigger the validation of a field.

For example, when a field is inserted into the DOM with a value, `insertWithValue` is added to the `eventLog` array of the relevant field. Thus, if you add `insertWithValue` to the `validatesOn` array, the field will validate when inserted into the DOM, provided that it is inserted with a value.

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

## Example

<Demos::SignupForm />
