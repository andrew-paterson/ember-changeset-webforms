import { visit, click, fillIn, triggerKeyEvent } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import testEls from './test-selectors';
import cth from 'ember-changeset-webforms/test-support/helpers';

// TODO test and document if the data prop of an omitted field is sent with the data payload to submitAction

module('Acceptance | Field omission', function (hooks) {
  setupApplicationTest(hooks);

  test('Explicit - yes first', async function (assert) {
    await visit('docs/hiding-and-showing-fields');
    checkStateMealRequiredNotSet(assert);
    await selectMealRequiredYes(assert);
    await selectMealOptionBeef(assert);
    await selectMealRequiredNo(assert);
    await selectMealRequiredYes(assert);
  });

  test('Explicit - no first', async function (assert) {
    await visit('docs/hiding-and-showing-fields');
    checkStateMealRequiredNotSet(assert);
    await selectMealRequiredNo(assert);
    await selectMealRequiredYes(assert);
    await selectMealOptionBeef(assert);
    await selectMealRequiredNo(assert);
  });

  test('Dynamic - yes first', async function (assert) {
    await visit('docs/hiding-and-showing-fields');
    checkStateMealRequiredNotSet(assert, { demoNumber: '2' });
    await selectMealRequiredYes(assert, { demoNumber: '2' });
    await selectMealOptionBeef(assert, { demoNumber: '2' });
    await selectMealRequiredNo(assert, { demoNumber: '2' });
    await selectMealRequiredYes(assert, { demoNumber: '2' });
  });

  test('Dynamic - no first', async function (assert) {
    await visit('docs/hiding-and-showing-fields');
    checkStateMealRequiredNotSet(assert, { demoNumber: '2' });
    await selectMealRequiredNo(assert, { demoNumber: '2' });
    await selectMealRequiredYes(assert, { demoNumber: '2' });
    await selectMealOptionBeef(assert, { demoNumber: '2' });
    await selectMealRequiredNo(assert, { demoNumber: '2' });
  });

  test('Dynamic with extended API- yes first', async function (assert) {
    await visit('docs/hiding-and-showing-fields');
    checkStateMealRequiredNotSet(assert, { demoNumber: '3' });
    await selectMealRequiredYes(assert, { demoNumber: '3' });
    await selectMealOptionBeef(assert, { demoNumber: '3' });
    await selectMealRequiredNo(assert, { demoNumber: '3' });
    await selectMealRequiredYes(assert, { demoNumber: '3' });
  });

  test('Dynamic with extended API- no first', async function (assert) {
    await visit('docs/hiding-and-showing-fields');
    checkStateMealRequiredNotSet(assert, { demoNumber: '3' });
    await selectMealRequiredNo(assert, { demoNumber: '3' });
    await selectMealRequiredYes(assert, { demoNumber: '3' });
    await selectMealOptionBeef(assert, { demoNumber: '3' });
    await selectMealRequiredNo(assert, { demoNumber: '3' });
  });

  test('Dynamic with nested rules', async function (assert) {
    await visit('docs/hiding-and-showing-fields');
    assert
      .dom(`${testEls.omittingFields4FormFreeDrinkField}`)
      .doesNotExist('Free drink field does not exist on load.');

    await click(
      `${testEls[`omittingFields4FormIsMemberFieldRadioOptionYes`]} input`,
    );
    assert
      .dom(`${testEls.omittingFields4FormFreeDrinkField}`)
      .exists(
        'Free drink field exists after user selects "Yes" for "Are you a member" field.',
      );
    await click(
      `${testEls[`omittingFields4FormIsMemberFieldRadioOptionNo`]} input`,
    );
    assert
      .dom(`${testEls.omittingFields4FormFreeDrinkField}`)
      .doesNotExist(
        'Free drink field removed when user selects "No" for "Are you a member" field.',
      );

    await fillIn(`${testEls.omittingFields4FormMainsField} input`, '3');
    await triggerKeyEvent(
      `${testEls.omittingFields4FormMainsField} input`,
      'keyup',
      13,
    );
    assert
      .dom(`${testEls.omittingFields4FormFreeDrinkField}`)
      .doesNotExist(
        'Free drink field does not exist when user sets "mains" field to 3, when sides field is empty',
      );
    await fillIn(`${testEls.omittingFields4FormSidesField} input`, '3');
    await triggerKeyEvent(
      `${testEls.omittingFields4FormSidesField} input`,
      'keyup',
      13,
    );
    assert
      .dom(`${testEls.omittingFields4FormFreeDrinkField}`)
      .exists('Free drink field does exist when user sets "sides" field to 3.');
    await fillIn(`${testEls.omittingFields4FormMainsField} input`, '2');
    await triggerKeyEvent(
      `${testEls.omittingFields4FormMainsField} input`,
      'keyup',
      13,
    );
    assert
      .dom(`${testEls.omittingFields4FormFreeDrinkField}`)
      .doesNotExist(
        'Free drink field does not exist when user sets "mains" field to 2.',
      );
  });
});

function checkStateMealRequiredNotSet(assert, opts = {}) {
  assert
    .dom(
      `${testEls[`omittedFieldsExample${opts.demoNumber || '1'}`]} ${testEls[`nextButton`]}`,
    )
    .doesNotExist('Next button does not exist on load.');
  assert
    .dom(testEls[`omittingFields${opts.demoNumber || '1'}FormMealOptionField`])
    .doesNotExist('Omitted meal option field does not exist on load.');
}

async function selectMealRequiredYes(assert, opts = {}) {
  await click(
    `${testEls[`omittingFields${opts.demoNumber || '1'}FormMealRequiredFieldRadioOptionYes`]} input`,
  );
  await cth.passedValidation(
    testEls[`omittingFields${opts.demoNumber || '1'}FormMealRequiredField`],
    assert,
    {
      assertionPrefix: 'Meal required field passed validation',
      assertionSuffix: 'after selecting "Yes"',
    },
  );
  await assert
    .dom(testEls[`omittingFields${opts.demoNumber || '1'}FormMealOptionField`])
    .exists(
      'Meal option field exists after "Yes" is clicked in meal required field.',
    );
  await assert.notOk(
    await cth.wasValidated(
      testEls[`omittingFields${opts.demoNumber || '1'}FormMealOptionField`],
    ),
    'Meal option field is not validated on insert.',
  );
  assert
    .dom(
      `${testEls[`omittedFieldsExample${opts.demoNumber || '1'}`]} ${testEls[`nextButton`]}`,
    )
    .doesNotExist(
      'Next button does not exist after selecting "Yes" for meal required, but before selecting a meal option.',
    );
}

async function selectMealRequiredNo(assert, opts = {}) {
  await click(
    `${testEls[`omittingFields${opts.demoNumber || '1'}FormMealRequiredFieldRadioOptionNo`]} input`,
  );
  await cth.passedValidation(
    `${testEls[`omittingFields${opts.demoNumber || '1'}FormMealRequiredField`]}`,
    assert,
    {
      assertionPrefix: 'Meal required field passed validation',
      assertionSuffix: 'after selecting "No"',
    },
  );
  await assert
    .dom(testEls[`omittingFields${opts.demoNumber || '1'}FormMealOptionField`])
    .doesNotExist(
      'Meal option field does not exist after "No" is clicked in meal required field.',
    );
  assert
    .dom(
      `${testEls[`omittedFieldsExample${opts.demoNumber || '1'}`]} ${testEls[`nextButton`]}`,
    )
    .exists('Next button exists after selecting "No" for meal required.');
}

async function selectMealOptionBeef(assert, opts = {}) {
  await click(
    `${testEls[`omittingFields${opts.demoNumber || '1'}FormMealOptionFieldRadioOptionBeef`]} input`,
  );
  await cth.passedValidation(
    testEls[`omittingFields${opts.demoNumber || '1'}FormMealOptionField`],
    assert,
    {
      assertionPrefix: 'Meal option field passed validation',
      assertionSuffix: 'after selecting a meal option',
    },
  );
  assert
    .dom(
      `${testEls[`omittedFieldsExample${opts.demoNumber || '1'}`]} ${testEls[`nextButton`]}`,
    )
    .exists('Next button exists after selecting a meal option.');
}
