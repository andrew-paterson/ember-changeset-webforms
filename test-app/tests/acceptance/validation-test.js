import {
  visit,
  find,
  click,
  findAll,
  focus,
  blur,
  fillIn,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import testEls from './test-selectors';
import els from 'ember-changeset-webforms/test-support/element-selectors';
import cth from 'ember-changeset-webforms/test-support/helpers';
import { selectChoose } from 'ember-power-select/test-support';

module('Acceptance | Field validation', function (hooks) {
  setupApplicationTest(hooks);

  test('Validation events', async function (assert) {
    await visit('/docs/field-validation');
    await assert.notOk(
      await cth.wasValidated(`${testEls.signupFormNameField}`),
      'Field with validation event "insert" is not validated when empty on insert.',
    );
    await cth.failedValidation(
      `${testEls.signupFormRecoveryEmailField}`,
      assert,
      {
        assertionSuffix:
          'Invalid field with validation event "insert" fails validation insert.',
      },
    );
    await focus(`${testEls.signupFormNameField} input`);
    assert.notOk(
      await cth.wasValidated(`${testEls.signupFormNameField}`),
      'Field without validation event "keyUp" loses validation when focussed.',
    );
    await blur(`${testEls.signupFormNameField} input`);
    assert.strictEqual(
      cth.fieldErrorText(`${testEls.signupFormNameField}`).join(''),
      `Name can't be blank`,
      'Correct default error message shows for empty name field after focus out.',
    );
    await focus(`${testEls.signupFormNameField} input`);
    await cth.failedValidation(`${testEls.signupFormNameField}`, assert, {
      assertionSuffix:
        'Field with "keyUp" validation event does not lose  class "invalid" when focussed.',
    });
    await fillIn(`${testEls.signupFormNameField} input`, 'T');
    await triggerKeyEvent(
      find(`${testEls.signupFormNameField} input`),
      'keyup',
      1,
    );
    await cth.passedValidation(`${testEls.signupFormNameField}`, assert, {
      assertionSuffix:
        'Field with "keyUp" validation event passes validation on keyUp when user types single char.',
    });
    await fillIn(`${testEls.signupFormNameField} input`, '');
    await triggerKeyEvent(
      find(`${testEls.signupFormNameField} input`),
      'keyup',
      1,
    );
    await cth.failedValidation(`${testEls.signupFormNameField}`, assert, {
      assertionSuffix:
        'Required field with "keyUp" validation event gets class "invalid" on keyUp, when user deletes the final char.',
    });
    await cth.passedValidation(`${testEls.signupFormEmailField}`, assert, {
      assertionSuffix:
        'Valid field with validation event "insert" passes validation on insert.',
    });
    await fillIn(`${testEls.signupFormEmailField} input`, 'bluemangroup');
    await blur(`${testEls.signupFormEmailField} input`);
    await focus(`${testEls.signupFormPasswordField} input`);
    await blur(`${testEls.signupFormPasswordField} input`);
    assert.ok(
      await cth.wasValidated(`${testEls.signupFormPasswordField}`),
      'Validation runs on focus out of input field by default.',
    );
    await click(
      `${testEls.signupFormAcceptTermsFieldRadioOptionTrue} input[type="radio"]`,
    );

    await cth.passedValidation(
      `${testEls.signupFormAcceptTermsField}`,
      assert,
      {
        assertionSuffix:
          'Validation runs after selecting option in radio button group.',
      },
    );

    await click(
      `${testEls.signupFormConfirmHumanField} input[type="checkbox"]`,
    );
    await cth.passedValidation(
      `${testEls.signupFormConfirmHumanField}`,
      assert,
      { assertionSuffix: 'Validation runs after checking single checkbox.' },
    );
    await click('.ember-basic-dropdown-trigger');
    await selectChoose(find(testEls.signupFormCountryField), 'United States');
    await cth.passedValidation(`${testEls.signupFormCountryField}`, assert, {
      assertionSuffix: 'Validation runs after selecting power select option.',
    });
    // TODO checkbox group and text area.
  });

  test('Validation messages', async function (assert) {
    await visit('/docs/field-validation');
    await click(els.cwfSubmitButton);
    assert.strictEqual(
      findAll(els.cwfFieldErrors).length,
      8,
      'All fields with validation rules are validated when user clicks submit button.',
    );
    assert.strictEqual(
      cth.fieldErrorText(testEls.signupFormCountryField).join(''),
      `Nation of origin can't be blank`,
      'Passing "description" as an argument to validationRules replaces the default validation description ("Details.country) with the description provided.',
    );
    assert.strictEqual(
      cth.fieldErrorText(testEls.signupFormAcceptTermsField).join(''),
      'You must accept the terms to continue.',
      'Passing "message" as an argument to validationRules replaces the default validation message with the message provided.',
    );
    await fillIn(`${testEls.signupFormEmailField} input`, '');
    await blur(`${testEls.signupFormEmailField} input`);
    assert.strictEqual(
      findAll(`${testEls.signupFormEmailField} ${els.cwfFieldError}`).length,
      2,
      'Multiple errors display where multiple exist.',
    );
  });

  test('Custom validators', async function (assert) {
    await visit('/docs/integrating-custom-validators');
    await click(els.cwfSubmitButton);
    const fields = findAll(
      `${testEls.integratingCustomValidatorsForm} ${els.cwfField}`,
    );
    assert.strictEqual(
      cth
        .fieldErrorText(fields[0])
        .concat(cth.fieldErrorText(fields[1]))
        .join('|'),
      'Each field must be unique- primary email is the same as recovery email.|Each field must be unique- recovery email is the same as primary email.',
      'Custom validator is applied correctly.',
    );
  });

  // TODO - validation of all fields on submit, and ignores hidden fields.
});
