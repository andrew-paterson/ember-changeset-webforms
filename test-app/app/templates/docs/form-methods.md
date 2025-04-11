# Form methods

The `changesetWebform` object has the following methods. It is included as an argument in all action calls. See [Action handling](docs/action-handling) for more details on action calls and their arguments.

- validateFields
- setFieldOmission

## `validateFields`

An asynchronous method that returns a promise, which resolves to an array containing the validations results for each field.

Rather then simple validating the entire changeset, which is the behaviour of `changeset.validate`, the `validateFields` method validates a subset of the changeset properties, based on the state of the related field.

Specifically, it will only validate those fields which:

- are currently included in the DOM (See [Hiding and showing fields](/docs/hiding-and-showing-fields))
- do not have `skipValidation` set to true.

## `setFieldOmission`

Allows you to updated whether or not a form field is omitted by passing the `fieldId` and a boolean value.

See [/docs/hiding-and-showing-fields#the-setfieldomission-method](/docs/hiding-and-showing-fields#the-setfieldomission-method).
