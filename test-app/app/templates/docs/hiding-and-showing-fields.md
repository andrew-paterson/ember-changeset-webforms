# Hiding and showing fields

## Using the `includeField` and `omitField` methods

### `omitField`

Sets a fields `omitted` property to `true`. It receives a single argument, the `fieldId` of the field to update.

Setting `omitted` to `true` on a fields has several implications:

- the related changeset property will not be validated when the `validateFields` method is run on submit, or in an action.
- the fields HTML element will be removed from the DOM entirely.
- the related data property will not be included in the data which is sent with the submit action.

See the below example of using `includeField` and `omitField`.

<Demos::HiddenFieldsExampleOne />

### `includeField`

Sets a fields `omitted` property to `false`. It receives a single argument, the `fieldId` of the field to update.

See the below example of using `includeField` and `omitField`.

<Demos::HiddenFieldsExampleOne />

## Dynamic field omission

It may not be convenient to use action handlers to forcibly show and hide fields in this scenario, so your field schema can define general conditions under which it should be shown or omitted. This is done with the `dynamicallyIncludeExclude` property, as in the example below.

<Demos::HiddenFieldsExampleTwo />

### Dynamic field omission API

- `omittedByDefault` => Boolean. Determines if the field should be omitted on load.
- `toggleDefaultOmission` => An object that specifies the conditions under which to toggle the fields omission start from the default, for example to include the field where `omittedByDefault` is true.
  - `ruleType` => either `anyConditionsTrue` or `allConditionsTrue`. If `allConditionsTrue`, then each condition in the conditions array must evaluate to true, in order for the default omission state to be toggled. If `anyConditionsTrue` then at least one condition in the conditions array must evaluate to true, in order for the default omission state to be toggled.
  - `conditions` => an array of objects each specifiying a `fieldId` and `valueEquals`. The condition evaluates to true if the current value of the related field matches that of `valueEquals`.

### Extending the dynamic field omission API

By default, objects in the `conditions` array can only include `valueEquals` along with `fieldId` as properties.

If you need extend this API to include comparisions other than exact string match, you can do so by passing a hash of additional methods to the `ChangesetWebform` component as the `@dynamicIncludeExcludeConditions` property.

Each method receives `value` and `condition` as arguments, and should return a truthy value.

- `value` is the current value of the field with the `fieldId` specified it the condition.
- `condition` is the relevant condition specified.

Now, any conditions in then `dynamicOmission` property of your field schema can use the names of any of these methods as a key, with the value to compare to.

In the example below, we add and invoke the `valueDoesNotEqual` method.

<Demos::HiddenFieldsExampleThree />

### Nested dynamic omission rules

<Demos::HiddenFieldsExampleFour />
