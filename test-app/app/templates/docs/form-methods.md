# `changesetWebform` class methods

Every instance of the instance of the ChangesetWebform component is underpinned by an instance of the `changesetWebform` class instance. It has several methods which apply to the form as a whole, outlined below.

Note that the `changesetWebform` instance is included as an argument in all action callbacks. See [Action handling](docs/action-handling).

## `validate`

Arguments: (`opts`)

Validates all fields which are not omitted (See [Hiding and showing fields](/docs/hiding-and-showing-fields)).

<Demos::FormMethodsExampleOne />

If you would like to only revalidate fields which have already been validated, set `opts.skipUnvalidated` to `true`.

<Demos::FormMethodsExampleTwo />

## `setFieldOmission`

Allows you to update whether or not a form field is omitted, by passing the `fieldId` and a boolean value.

See [/docs/hiding-and-showing-fields#the-setfieldomission-method](/docs/hiding-and-showing-fields#the-setfieldomission-method).

<Demos::FormMethodsExampleThree />

## `isValid`

Checks the validation of all fields which:

- have validation rules and,
- are not currently omitted.

If all such fields are valid, it returns `true`, otherwise it returns `false`.

Note that this method also checks the validation of fields which have not yet been validated, but does not trigger any validation UI on those fields.

Thus, in the example below, if you click the "Check if form is valid" button while both fields are empty and unvalidated, the alert will show that the form is not valid, but the form itself will not update in any way.

<Demos::FormMethodsExampleFour />
