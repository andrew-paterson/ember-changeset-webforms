# Form submission

## Default form submission

When a user clicks the submit button, the `submit` action is fired the `ChangesetWebform` component.

The following series of events occurs.

### Preflighting

A preflight function is run which:

- Validates all fields.
- Calls the `afterValidateFields` action.
  - If validation fails it calls the `formValidationFailed` action.
  - If validation passes it:
    - Calls the `formValidationPassed` action.
    - Calls the `beforeSubmitForm` action.
    - For any fields that are omitted, the corresponding changeset proprties are set to null. See <LinkTo @route="docs.hiding-and-showing-fields">Hiding and showing fields</LinkTo> for more.

### Activation of the tracked requestInFlight property

The tracked property `changesetWebform.formSettings.requestInFlight` is set to `true`. This can be used to create a UX which shows the user that a response is pending.

### The changeset is saved

The changeset is saved using the `changeset.save()` method. This means that if your changeset is an Ember model, the models `save` method will be triggered, which will update the record in Ember Data, but also send a `PATCH` request to the server to persist those changes.

### Call the `submitAction` action if passed

If `@submitAction` is passed to the `<ChangesetWebform />` component it will be called at this point.

Unless your changeset is an Ember model, you will need to use this action to trigger a network request, if that is required.

An example would be to make a `POST` request to the sever, to persist a new record to the database.

### Deactivation of the tracked requestInFlight property

The tracked property `changesetWebform.formSettings.requestInFlight` is set to `false`. This can be used to create a UX which shows the user that a response is complete.

### The `submitSuccess` or `submitError` actions are called if passed

If `@submitSuccess` is passed to the `<ChangesetWebform />` component it will be called if the `changeset.save()` and `submitAction` actions are successful. The response is included as the first argument.
If `@submitError` is passed to the `<ChangesetWebform />` component it will be called if either the `changeset.save()` or `submitAction` actions are unsuccessful. The error response is included as the first argument.

<Demos::DefaultFormSubmission />

## Custom form submission

If the `@onFormSubmit` action is passed to the `<ChangesetWebform />` component, it will completely iverride all default form submission behaviour.

The action receives the `changesetWebform` object, as well as the component `args` as arguments.

The example below also shows how the preflight utli can be invoked if needed.

<Demos::CustomFormSubmission />
