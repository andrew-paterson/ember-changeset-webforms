[ ] Docs for custom fields
[ ] default styles for remove clone button
[ ] Docs for power date picker must show defaultDate outside the input on load.
[ ] Does it work without render-modifers installed?
[ ] Document pushErrors for form-field and changesetWebform

## Power selct

All actions emitted as userInteraction and onChnage
All options integrated

[x] containerName for checkbox group and radio button group

Do labelComponent, checkboxLabelComponent, optionLabelComponent, contentComponent allow strings?

All IDs must use formName as namespace

Tech debt

All classes and data attrs with ember-changeset-webforms replaced by cwf

change defaultValue to autoFill

Aria:
checked
controls
current
expanded
label
owns
selected

activedescendant
atomic
autocomplete
controls
current
describedby
disabled
expanded
hidden
label
labelledby
live
pressed
valuemax
valuemin
valuenow
valuetext

Use aria-labelledBy if label is present, else use label
role=group
aria described by for error messages

icons for next/prev month and year.
define app wide icons for cross etc.
Use svg for "ember-power-select-status-icon" (Override component)

TODO - exclude fields from changeset altogether, bot just castOut on submit. Set this is form when using field, or on field definition as a default.
TODO - disable single option where things have options.

TODO Document and test for <EmberChangesetWebforms::FieldElements::FieldDescription
@description={{@formField.description}}
@descriptionMarkdown={{@formField.descriptionMarkdown}}
/>

[x]`fieldType: 'clone-group',` => `fieldType: 'clone-group',`

Chnagelog

default field names
No longer force save even when submit action is provided

Check if ember try

Add input event to all input and textarea elements

[ ] ECW - submitComplete v submitError and submitSuccess
[ ] Test for data as class instance and ember object (Should fail when saving chamgeset after setting defaults)
[ ] clearFormAfterSubmit is documented
[ ] classList.contains('valid') becomes ecwTestHelpers.passedvalidation

[ ] ECW Add icon options to all buttons
showRollbackChangesetButton
showClearFormButton
submitButton => submitButtonIconComponent but also spinner
addCloneButton => addCloneButtonIconComponent
removeCloneButton => removeCloneComponent

[x] ECW add docs for these `options: [], // Array of objects.`

[x] ECW check that classes for radio and check option labels work- md, text and compoennt

[x] ECW check if selectedItem component received `@extra` prop from Power select, as triggerComponent does

[x] ECW ensure all possible options from Ember Power Select can be passed to both power select and power select checkboxes component is passed correctly.

[x] ECW document Add `{{on "click" @onClick}} to the element in the component to ensure the clicker works in main docs for clicker

[ECW] afterFieldInsertedAction => remove "Action" amd same for other instances (Note required since @ and this.)

[x] ECW must require explict import of validators

[ ] ECW- prefix all classes, make power-datetime-picker its own component with tests, document that ember-test-selectors is suggested

[x] ECW - Split built in fields docs

[x] - Understand ehy there is noth validateField/s and validate for field and chnagesetWebform

[ ] - document test helpers

[x] - Document data-set-custom-validity

[x] - fix issue with button role on <@masterFormField.removeCloneComponent.componentClass in ember-changeset-webforms/src/components/ember-changeset-webforms/cloned-field-elements/remove-clone-button.hbs

[x] check {{attrs-from-config
        "formFields"
        this.changesetWebform
        null
        @requestInFlight
      }} in ember-changeset-webforms/src/components/changeset-webform.hbs

[x] test that attrs-from-config works on trigger for power select checkboxes

[ ] Aria for the clicker element

[ ] Ability to specificy that a custom field definition should not warn about missing fieldLabel
