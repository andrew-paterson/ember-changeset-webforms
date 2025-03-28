// Enter to submit while in an input.
import { visit, fillIn, blur, click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import testEls from './test-selectors';
import cth from 'ember-changeset-webforms/test-support/helpers';

module('Acceptance | Form buttons', function (hooks) {
  setupApplicationTest(hooks);

  test('Basics', async function (assert) {
    await visit('/docs/form-settings');
    assert.notOk(
      await cth.wasValidated(testEls.signupFormNameField),
      'Name field is not validated on insert.',
    );
    assert
      .dom(`${testEls.signupFormNameField} input`)
      .hasValue('', 'Name field is empty on insert.');
    await fillIn(`${testEls.signupFormNameField} input`, 'Steve Holt');
    await blur(`${testEls.signupFormNameField} input`);
    assert
      .dom(`${testEls.signupFormNameField} input`)
      .hasValue(
        'Steve Holt',
        'Name field has value after filling in focussing out.',
      );
    await cth.passedValidation(testEls.signupFormNameField, assert, {
      assertionSuffix:
        'Name field passes validation after  filling in focussing out.',
    });
    assert
      .dom(`${testEls.signupFormRecoveryEmailField} input`)
      .hasValue('test', 'Email recovery field has initial value "test".');
    await cth.failedValidation(testEls.signupFormRecoveryEmailField, assert, {
      assertionSuffix: 'Email recovery field has failed validation on insert.',
    });
    await fillIn(
      `${testEls.signupFormRecoveryEmailField} input`,
      'test@email.com',
    );
    await blur(`${testEls.signupFormRecoveryEmailField} input`);

    await cth.passedValidation(testEls.signupFormRecoveryEmailField, assert, {
      assertionSuffix:
        'Email recovery field passes validation after completing the email and focussing out.',
    });
    assert
      .dom(`${testEls.signupFormRecoveryEmailField} input`)
      .hasValue(
        'test@email.com',
        'Email recovery field has value "test@email.com after being completed".',
      );
    await click(testEls.cwfDiscardChangesButton);
    assert
      .dom(`${testEls.signupFormRecoveryEmailField} input`)
      .hasValue(
        'test',
        'Email recovery field has value "test" after clicking "Discard changes".',
      );
    await cth.failedValidation(testEls.signupFormRecoveryEmailField, assert, {
      assertionSuffix:
        'Email recovery field fails validation after clicking "Discard changes".',
    });
    assert.notOk(
      await cth.wasValidated(testEls.signupFormNameField),
      'Name field is not validated after clicking "Discard changes".',
    );
    assert
      .dom(`${testEls.signupFormNameField} input`)
      .hasValue('', 'Name field is empty after clicking "Discard changes".');
    await click(testEls.cwfClearFormButton);
    assert.ok(
      await cth.noneValidated(
        `${testEls.signupForm} ${testEls.dataTestCwfField}`,
      ),
      'All fields are not validated after clicking "Clear form".',
    );

    // await click(testEls.cwfSubmitFormButton);
  });
});

// Icons show
// Spinner works for submit
