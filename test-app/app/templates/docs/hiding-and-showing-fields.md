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

## Using dynamic rules for inclusion or exclusion

Consider a scenario where your form is preloaded with data, and some fields should be omitted based on the values of other fields.

It may not be convenient to use action handlers to focibly show and hide fields in this scenario, so your field schema can define general conditions under which it should be shown or omitted. This is done with the `dynamicallyIncludeExclude` property, as in the example below.

<Demos::HiddenFieldsExampleTwo />

The API is as follows.

`ruleType` => `anyConditionsTrue` or `allConditionsTrue`
`conditions`
