# Form methods

The `changesetWebform` object has the following methods. It is included as an argument in all action calls. See [Action handling](docs/action-handling) for more details on action calls and their arguments.

- validateFields
- showField
- hideField

## `validateFields`

An asynchronous method that returns a promise, which resolves to an array containing the validations results for each field.

Rather then simple validating the entire changeset, which is the behaviour of `changeset.validate`, the `validateFields` method validates a subset of the changeset properties, based on the state of the related field.

Specifically, it will only validate those fields which:

- are currently included in the DOM (See [Hiding and showing fields](/docs/hiding-and-showing-fields))
- do not have `skipValidation` set to true.

## `hideField`

Sets a fields `hidden` property to `true`. It receives a single argument, the `fieldId` of the field to update.

Setting `hidden` to `true` on a fields has several implications:

- the related changeset property will not be validated when the `validateFields` method is run on submit, or in an action.
- the fields HTML element will be removed from the DOM entirely.
- the related data property will not be included in the data which is sent with teh submit action.

See the below example of using `showField` and `hideField`.

<Demos::HiddenFieldsExampleOne />

## `showField`

Sets a fields `hidden` property to `false`. It receives a single argument, the `fieldId` of the field to update.

See the below example of using `showField` and `hideField`.

<Demos::HiddenFieldsExampleOne />
