import {
  visit,
  click,
  fillIn,
  triggerKeyEvent,
  focus,
  blur,
  find,
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import testEls from './test-selectors';
import cth from 'ember-changeset-webforms/test-support/helpers';

module('Acceptance | Field methods', function (hooks) {
  setupApplicationTest(hooks);

  test('validate method', async function (assert) {
    await visit('docs/field-methods');
    await click(
      '[data-test-id="example-1"] [data-test-id="validate-externally"]',
    );
    assert.ok(
      cth.failedValidation('[data-test-id="field-methods1-form-name-field"]'),
      'Name fields fails validation with UI triggered when external validate button is clicked and field is empty',
    );
    await fillIn(
      '[data-test-id="field-methods1-form-name-field"] input',
      'Steve Holt',
    );
    await triggerKeyEvent(
      '[data-test-id="field-methods1-form-name-field"] input',
      'keyup',
      13,
    );
    assert.ok(
      cth.passedValidation('[data-test-id="field-methods1-form-name-field"]'),
      'Name fields passes validation with UI triggered when external validate button is clicked and field is filled in correctly',
    );
  });

  test('validate method with skipUnvalidated', async function (assert) {
    await visit('docs/field-methods');
    assert.notOk(
      await cth.wasValidated('[data-test-id="field-methods2-form-name-field"]'),
      'Name is not validated on insert.',
    );
    // await click(
    //   '[data-test-id="example-2"] [data-test-id="validate-externally"]',
    // );
    // assert.notOk(
    //   await cth.wasValidated('[data-test-id="field-methods2-form-name-field"]'),
    //   'Name is not validated when external validate button is clicked, when field has not yet been validated',
    // );
    await focus('[data-test-id="field-methods2-form-name-field"] input');
    await blur('[data-test-id="field-methods2-form-name-field"] input');
    assert.ok(
      cth.failedValidation('[data-test-id="field-methods2-form-name-field"]'),
      'Name field fails validation after focus out when name is invalid.',
    );

    await click(
      '[data-test-id="example-2"] [data-test-id="validate-externally"]',
    );
    assert.ok(
      await cth.passedValidation(
        '[data-test-id="field-methods2-form-name-field"]',
      ),
      'Name is has successful validation when external validate button is clicked',
    );
  });

  test('setFieldOmission method', async function (assert) {
    await visit('docs/field-methods');
    assert
      .dom('[data-test-id="field-methods3-form-name-field"]')
      .exists('Name field exists on load');
    await click(
      '[data-test-id="example-3"] [data-test-id="toggle-name-field"]',
    );
    assert
      .dom('[data-test-id="field-methods3-form-name-field"]')
      .doesNotExist(
        'Name field does not exist after clicking external toggle name button',
      );
    await click(
      '[data-test-id="example-3"] [data-test-id="toggle-name-field"]',
    );
    assert
      .dom('[data-test-id="field-methods3-form-name-field"]')
      .exists(
        'Name field exists after clicking external toggle name button again',
      );
  });

  test('updateValue method', async function (assert) {
    await visit('docs/field-methods');
    assert
      .dom('[data-test-id="field-methods4-form-name-field"] input')
      .hasNoValue('Name field has no value on load');
    await click(
      '[data-test-id="example-4"] [data-test-id="update-name-field"]',
    );

    assert
      .dom('[data-test-id="field-methods4-form-name-field"] input')
      .hasValue(
        'New Name',
        'Name field has has value "New name" after clicking "Update value of the name field" button.',
      );
    assert.notOk(
      await cth.wasValidated('[data-test-id="field-methods4-form-name-field"]'),
      'Name is not validated when "Update value of the name field" button is clicked',
    );
  });

  // test('updateValue method - eventName passed', async function (assert) {
  //   await visit('docs/field-methods');
  //   assert
  //     .dom('[data-test-id="field-methods5-form-name-field"] input')
  //     .hasNoValue('Name field has no value on load');
  //   await click(
  //     '[data-test-id="example-5"] [data-test-id="update-name-field"]',
  //   );

  //   assert
  //     .dom('[data-test-id="field-methods5-form-name-field"] input')
  //     .hasValue(
  //       'New Name',
  //       'Name field has has value "New name" after clicking "Update value of the name field" button.',
  //     );
  //   assert.ok(
  //     await cth.passedValidation(
  //       '[data-test-id="field-methods5-form-name-field"]',
  //     ),
  //     'Name is validated when "Update value of the name field" button is clicked',
  //   );
  // });
});
