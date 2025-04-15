# Field methods

## `setOmission`

Allows you to updated whether the field is omitted by passing a boolean value.

See [/docs/hiding-and-showing-fields#the-setomission-method](/docs/hiding-and-showing-fields#the-setomission-method).

## `updateValue`

Arguments: (`value`, `eventName`)

Updates the value of the field.

The `value` argument is the value to update the field to.

The `eventName` argument is optional, and defaults to `valueUpdated`. This is only relevant for determining if the field should be validated after being updated.

## `applyDefaultValue`

Updates a field's value to its `defaultValue` prop.

## `reset`

Discards any unsaved changes to the field's value, and unvalidates the field.

## `validate`

Validates the field and returns the result of the validation.
