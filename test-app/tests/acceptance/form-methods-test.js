import { visit, click, fillIn, triggerKeyEvent } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import testEls from './test-selectors';
import cth from 'ember-changeset-webforms/test-support/helpers';

module('Acceptance | Form methods', function (hooks) {
  setupApplicationTest(hooks);

  test('validate method', async function (assert) {
    await visit('docs/form-methods');
    await click(
      '[data-test-id="example-1"] [data-test-id="validate-externally"]',
    );
    assert.ok(
      cth.failedValidation('[data-test-id="form-methods1-form-name-field"]'),
      'Name fields fails validation with UI triggered when external validate button is clicked and field is empty',
    );
    assert.ok(
      cth.failedValidation('[data-test-id="form-methods1-form-email-field"]'),
      'Email fields fails validation with UI triggered when external validate button is clicked and field is empty',
    );
    await fillIn(
      '[data-test-id="form-methods1-form-name-field"] input',
      'Steve Holt',
    );
    await triggerKeyEvent(
      '[data-test-id="form-methods1-form-name-field"] input',
      'keyup',
      13,
    );
    await fillIn(
      '[data-test-id="form-methods1-form-email-field"] input',
      'steveholt@bluthcompany.com',
    );
    await triggerKeyEvent(
      '[data-test-id="form-methods1-form-email-field"] input',
      'keyup',
      13,
    );
    assert.ok(
      cth.passedValidation('[data-test-id="form-methods1-form-name-field"]'),
      'Name fields passes validation with UI triggered when external validate button is clicked and field is filled in correctly',
    );
    assert.ok(
      cth.passedValidation('[data-test-id="form-methods1-form-email-field"]'),
      'Email fields passes validation with UI triggered when external validate button is clicked and field is filled in correctly',
    );
  });

  test('validate method with skipUnvalidated', async function (assert) {
    await visit('docs/form-methods');
    assert.notOk(
      await cth.wasValidated('[data-test-id="form-methods2-form-name-field"]'),
      'Name is not validated on insert.',
    );
    assert.ok(
      cth.failedValidation('[data-test-id="form-methods2-form-email-field"]'),
      'Email fields fails validation with UI triggered when inserted with invalid value',
    );
    await click(
      '[data-test-id="example-2"] [data-test-id="validate-externally"]',
    );
    assert.notOk(
      await cth.wasValidated('[data-test-id="form-methods2-form-name-field"]'),
      'Name is not validated when external validate button is clicked',
    );
    assert.ok(
      cth.passedValidation('[data-test-id="form-methods2-form-email-field"]'),
      'Email fields is revalidated with with UI triggered when external validate button is clicked',
    );
  });

  test('setFieldOmission method', async function (assert) {
    await visit('docs/form-methods');
    assert
      .dom('[data-test-id="form-methods3-form-email-field"]')
      .exists('Email field exists on load');
    await click(
      '[data-test-id="example-3"] [data-test-id="toggle-email-field"]',
    );
    assert
      .dom('[data-test-id="form-methods3-form-email-field"]')
      .doesNotExist(
        'Email field does not exist after clicking external toggle email button',
      );
    await click(
      '[data-test-id="example-3"] [data-test-id="toggle-email-field"]',
    );
    assert
      .dom('[data-test-id="form-methods3-form-email-field"]')
      .exists(
        'Email field exists after clicking external toggle email button again',
      );
  });

  test('isValid method', async function (assert) {
    await visit('docs/form-methods');
    await click(
      '[data-test-id="example-4"] [data-test-id="check-if-form-is-valid"]',
    );
    assert
      .dom('[data-test-id="example-4"] [data-test-id="alert-danger"]')
      .hasText('Form is not valid', 'Alert shows correct danger message');
    await fillIn(
      '[data-test-id="form-methods4-form-name-field"] input',
      'Steve Holt',
    );
    await triggerKeyEvent(
      '[data-test-id="form-methods4-form-name-field"] input',
      'keyup',
      13,
    );
    await fillIn(
      '[data-test-id="form-methods4-form-email-field"] input',
      'steveholt@bluthcompany.com',
    );
    await triggerKeyEvent(
      '[data-test-id="form-methods4-form-email-field"] input',
      'keyup',
      13,
    );
    await click(
      '[data-test-id="example-4"] [data-test-id="check-if-form-is-valid"]',
    );

    await assert
      .dom('[data-test-id="example-4"] [data-test-id="alert-success"]')
      .hasText('Form is valid', 'Alert shows correct success message');
  });

  test('clear method', async function (assert) {
    await visit('docs/field-validation');

    await click(testEls.cwfClearFormButton);
  });
});
