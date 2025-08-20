import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  focus,
  blur,
  fillIn,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import {
  passedValidation,
  failedValidation,
  wasValidated,
} from 'ember-changeset-webforms/test-support/helpers';
import validationTestHelpersDefaults from 'ember-changeset-webforms/test-support/validation-test-helpers-defaults';
let updatedFormSchema;
module('Integration | Component | Validation events', function (hooks) {
  setupRenderingTest(hooks);
  this.updateFormSchema = (formSchema) => {
    formSchema.fields.forEach((field) => {
      if (field.fieldId === 'email') {
        field.showValidationWhenFocussed = false;
      }
      if (field.validatesOn) {
        field.validatesOn.push('$inherited');
      }
    });
    updatedFormSchema = formSchema;
  };

  test('Validation events', async function (assert) {
    await render(hbs`
      <Demos::ValidationEvents />`);
    await focus('[data-test-id="validation-events-form-name-field"] input');
    await blur('[data-test-id="validation-events-form-name-field"] input');
    await failedValidation(
      '[data-test-id="validation-events-form-name-field"]',
      validationTestHelpersDefaults,
      assert,
      'Required input field with default validation events fails validation on focusOut when empty',
    );
    await focus('[data-test-id="validation-events-form-name-field"] input');
    assert.notOk(
      await wasValidated(
        '[data-test-id="validation-events-form-email-field"]',
        validationTestHelpersDefaults,
      ),
      'Required input field with default validation loses failed validation UI when focussed',
    );
    await fillIn(
      '[data-test-id="validation-events-form-name-field"] input',
      'Steve Holt',
    );
    await triggerKeyEvent(
      '[data-test-id="validation-events-form-name-field"] input',
      'keyup',
      1,
    );
    assert.notOk(
      await wasValidated(
        '[data-test-id="validation-events-form-email-field"]',
        validationTestHelpersDefaults,
      ),
      'Required input field with default validation is not validated on keyUp',
    );
    await blur('[data-test-id="validation-events-form-name-field"] input');
    await passedValidation(
      '[data-test-id="validation-events-form-name-field"]',
      validationTestHelpersDefaults,
      assert,
      'Required input field with default validation events passes validation on focusOut when it has a value',
    );
    // Custom validation events, without $inherited
    await focus('[data-test-id="validation-events-form-email-field"] input');
    await blur('[data-test-id="validation-events-form-email-field"] input');
    assert.notOk(
      await wasValidated(
        '[data-test-id="validation-events-form-email-field"]',
        validationTestHelpersDefaults,
      ),
      'Required input field with only keyUp as a validation event is not validated on focusOut when empty',
    );
    await fillIn(
      '[data-test-id="validation-events-form-email-field"] input',
      's',
    );
    await triggerKeyEvent(
      '[data-test-id="validation-events-form-email-field"] input',
      'keyup',
      1,
    );
    await failedValidation(
      '[data-test-id="validation-events-form-email-field"]',
      validationTestHelpersDefaults,
      assert,
      'Required input type email field with only keyUp as a validation event fails validation keyUp with invalid format',
    );
    await blur('[data-test-id="validation-events-form-email-field"] input');
    await focus('[data-test-id="validation-events-form-email-field"] input');
    await failedValidation(
      '[data-test-id="validation-events-form-email-field"]',
      validationTestHelpersDefaults,
      assert,
      'Required input type email field with only keyUp as a validation event does not lose failed validation UI when focussed',
    );

    // Custom validation events, with $inherited
    await focus(
      '[data-test-id="validation-events-form-phone-number-field"] input',
    );
    await blur(
      '[data-test-id="validation-events-form-phone-number-field"] input',
    );
    await failedValidation(
      '[data-test-id="validation-events-form-phone-number-field"]',
      validationTestHelpersDefaults,
      assert,
      'Required input field with default validation events + keyUp as validation events fails validation on focusOut when empty',
    );
    await fillIn(
      '[data-test-id="validation-events-form-phone-number-field"] input',
      '111',
    );
    await triggerKeyEvent(
      '[data-test-id="validation-events-form-phone-number-field"] input',
      'keyup',
      1,
    );
    await passedValidation(
      '[data-test-id="validation-events-form-phone-number-field"]',
      validationTestHelpersDefaults,
      assert,
      'Required input field with default validation events + keyUp as validation events passes validation on typeIn',
    );
    await fillIn(
      '[data-test-id="validation-events-form-phone-number-field"] input',
      '11',
    );
    await triggerKeyEvent(
      '[data-test-id="validation-events-form-phone-number-field"] input',
      'keyup',
      1,
    );
    await failedValidation(
      '[data-test-id="validation-events-form-phone-number-field"]',
      validationTestHelpersDefaults,
      assert,
      'Required input field with default validation events + keyUp as validation events fails validation on typeIn',
    );
    await blur(
      '[data-test-id="validation-events-form-phone-number-field"] input',
    );
    await focus(
      '[data-test-id="validation-events-form-phone-number-field"] input',
    );
    await failedValidation(
      '[data-test-id="validation-events-form-phone-number-field"]',
      validationTestHelpersDefaults,
      assert,
      'Required input field with default validation events + keyUp as validation events does not lose failed validation UI when focussed',
    );
  });
  test('Validation events - showValidationWhenFocussed === false', async function (assert) {
    await render(hbs`
      <Demos::ValidationEvents @updateFormSchema={{this.updateFormSchema}}/>`);
    await focus('[data-test-id="validation-events-form-name-field"] input');
    await blur('[data-test-id="validation-events-form-name-field"] input');
    const emailField = updatedFormSchema.fields.find(
      (field) => field.fieldId === 'email',
    );
    const phoneNumberField = updatedFormSchema.fields.find(
      (field) => field.fieldId === 'phoneNumber',
    );
    assert.ok(
      emailField.validatesOn.includes('keyUp'),
      'Email field has keyUp included in validatesOn',
    );
    assert.ok(
      phoneNumberField.validatesOn.includes('keyUp'),
      'Phone number field has keyUp included in validatesOn',
    );
    assert.false(
      emailField.showValidationWhenFocussed,
      'Email field has showValidationWhenFocussed set to false',
    );
    assert.notOk(
      Object.keys(phoneNumberField).includes('showValidationWhenFocussed'),
      'Phone number field does not have showValidationWhenFocussed set',
    );
    await fillIn(
      '[data-test-id="validation-events-form-email-field"] input',
      '11',
    );
    await triggerKeyEvent(
      '[data-test-id="validation-events-form-email-field"] input',
      'keyup',
      1,
    );
    assert.notOk(
      await wasValidated(
        '[data-test-id="validation-events-form-email-field"]',
        validationTestHelpersDefaults,
      ),
      'Required input field with $inherited + keyUp validation events and showValidationWhenFocussed === false is not validated on keyup.',
    );
    await blur('[data-test-id="validation-events-form-email-field"] input');
    await failedValidation(
      '[data-test-id="validation-events-form-email-field"]',
      validationTestHelpersDefaults,
      assert,
      'Required input field with $inhertited + keyUp validation events and showValidationWhenFocussed === false fails validation on blur.',
    );
    await focus('[data-test-id="validation-events-form-email-field"] input');
    assert.notOk(
      await wasValidated(
        '[data-test-id="validation-events-form-email-field"]',
        validationTestHelpersDefaults,
      ),
      'Required input field with $inherited + keyUp validation events and showValidationWhenFocussed === false is unvalidated on focus.',
    );
    await fillIn(
      '[data-test-id="validation-events-form-phone-number-field"] input',
      '11',
    );
    await triggerKeyEvent(
      '[data-test-id="validation-events-form-phone-number-field"] input',
      'keyup',
      1,
    );
    await failedValidation(
      '[data-test-id="validation-events-form-phone-number-field"]',
      validationTestHelpersDefaults,
      assert,
      'Required input field with $inhertited + keyUp validation events and showValidationWhenFocussed not set fails validation on keyup.',
    );
    await blur(
      '[data-test-id="validation-events-form-phone-number-field"] input',
    );
    await failedValidation(
      '[data-test-id="validation-events-form-phone-number-field"]',
      validationTestHelpersDefaults,
      assert,
      'Required input field with $inhertited + keyUp validation events and showValidationWhenFocussed not set fails validation on blur.',
    );
    await focus(
      '[data-test-id="validation-events-form-phone-number-field"] input',
    );
    assert.ok(
      await wasValidated(
        '[data-test-id="validation-events-form-phone-number-field"]',
        validationTestHelpersDefaults,
      ),
      'Required input field with $inherited + keyUp validation events and showValidationWhenFocussed not set is not unvalidated on focus.',
    );
  });
});
