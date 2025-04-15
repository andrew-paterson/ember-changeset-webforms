# Field methods

## `validate`

Arguments: (`opts`)

Validates the field if it is not omitted (See [Hiding and showing fields](/docs/hiding-and-showing-fields)).

<Demos::FieldMethodsExampleOne />

If you would like to only revalidate fields which have already been validated, set `opts.skipUnvalidated` to `true`.

<Demos::FieldMethodsExampleTwo />

## `setOmission`

Allows you to updated whether the field is omitted by passing a boolean value.

See [/docs/hiding-and-showing-fields#the-setomission-method](/docs/hiding-and-showing-fields#the-setomission-method).

<Demos::FieldMethodsExampleThree />

## `updateValue`

Arguments: (`value`, `eventName`)

Updates the value of the field.

The `value` argument is the value to update the field to.

The `eventName` argument is optional, and defaults to `valueUpdated`. This is only relevant for determining if the field should be validated after being updated.

The example below demostrates the behaviour if `eventName` is not passed. Cliking the "Update value of name field" button updates the value of the name field, but has no effect on validation.

<Demos::FieldMethodsExampleFour />

The example below demostrates the behaviour if `eventName` is passed, while the same `eventName` is added to the `validatesOn` array for the field.

Cliking the "Update value of name field" button updates the value of the name field, and validates the field.

<Demos::FieldMethodsExampleFive />

## `reset`

Discards any unsaved changes to the field's value, and unvalidates the field.

<Demos::FieldMethodsExampleSix />
