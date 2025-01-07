import {
  visit,
  click,
  fillIn,
  focus,
  blur,
  findAll,
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import cth from 'ember-changeset-webforms/test-support/helpers';
import testEls from './test-selectors';
import els from 'ember-changeset-webforms/test-support/element-selectors';

module('Acceptance | Action handling', function (hooks) {
  setupApplicationTest(hooks);

  test('onFieldValueChange', async function (assert) {
    await visit('/docs/action-handling');
    await fillIn(
      `${testEls.onFieldValueChangeForm} ${testEls.namesFormFirstNameField} input`,
      'G',
    );
    assert
      .dom(testEls.onFieldValueChangeFeedback)
      .hasText(
        `The user's full name is "G ". The last updated field was First name. The value of settings.formName is names.`,
        'All arguments are correctly sent with the onFieldValueChange action.',
      );
    await fillIn(
      `${testEls.onFieldValueChangeForm} ${testEls.namesFormFirstNameField} input`,
      'Gene',
    );
    assert
      .dom(testEls.onFieldValueChangeFeedback)
      .hasText(
        `The user's full name is "Gene ". The last updated field was First name. The value of settings.formName is names.`,
        'onFieldValueChange runs when user types in an input field.',
      );
  });

  test('afterFieldValidation', async function (assert) {
    await visit('/docs/action-handling');
    await focus(
      `${testEls.afterFieldValidationForm} ${testEls.nameAndEmailFormNameField} input`,
    );
    await blur(
      `${testEls.afterFieldValidationForm} ${testEls.nameAndEmailFormNameField} input`,
    );
    assert
      .dom(testEls.afterFieldValidationFeedback)
      .hasText(
        `The user's name is "". The last validated field was Name. The first argument to the afterFieldValidation argument has the following values: value: "" validation: [Name can't be blank] The form has the following fields: name, email. The value of settings.formName is nameAndEmail.`,
        'All arguments are correctly sent with the afterFieldValidation action, after blur, where there is one validation error.',
      );
    await fillIn(
      `${testEls.afterFieldValidationForm} ${testEls.nameAndEmailFormNameField} input`,
      'Gene Parmesan',
    );
    await blur(
      `${testEls.afterFieldValidationForm} ${testEls.nameAndEmailFormNameField} input`,
    );
    assert
      .dom(testEls.afterFieldValidationFeedback)
      .hasText(
        `The user's name is "Gene Parmesan". The last validated field was Name. The Name has no validation errors when its value is Gene Parmesan. The form has the following fields: name, email. The value of settings.formName is nameAndEmail.`,
        'All arguments are correctly sent with the onFieldValueChange action when field has no validation errors.',
      );
    await focus(
      `${testEls.afterFieldValidationForm} ${testEls.nameAndEmailFormEmailField} input`,
    );
    await blur(
      `${testEls.afterFieldValidationForm} ${testEls.nameAndEmailFormEmailField} input`,
    );
    assert
      .dom(testEls.afterFieldValidationFeedback)
      .hasText(
        `The user's name is "Gene Parmesan". The last validated field was Email. The first argument to the afterFieldValidation argument has the following values: value: "" validation: [Email can't be blank,Email must be a valid email address] The form has the following fields: name, email. The value of settings.formName is nameAndEmail.`,
        'All arguments are correctly sent with the afterFieldValidation action, after blur of the email input, where there are two validation errors.',
      );
    await fillIn(
      `${testEls.afterFieldValidationForm} ${testEls.nameAndEmailFormEmailField} input`,
      'geeeeeeeene@parmesan.com',
    );
    await blur(
      `${testEls.afterFieldValidationForm} ${testEls.nameAndEmailFormEmailField} input`,
    );
    assert
      .dom(testEls.afterFieldValidationFeedback)
      .hasText(
        `The user's name is "Gene Parmesan". The last validated field was Email. The Email has no validation errors when its value is geeeeeeeene@parmesan.com. The form has the following fields: name, email. The value of settings.formName is nameAndEmail.`,
        'All arguments are correctly sent with the onFieldValueChange action when field has no validation errors.',
      );
  });

  test('afterGenerateChangesetWebform', async function (assert) {
    await visit('/docs/action-handling');
    await click(
      `${testEls.afterGenerateChangesetWebformFeedback} ${testEls.nextButton}`,
    );
    assert.strictEqual(
      findAll(
        `${testEls.afterGenerateChangesetWebformForm} ${testEls.nameAndEmailFormNameField} ${els.cwfFieldError}`,
      ).length,
      1,
      'One error message shows for empty name field after user clicks next button.',
    );
    assert.strictEqual(
      findAll(
        `${testEls.afterGenerateChangesetWebformForm} ${testEls.nameAndEmailFormNameField} ${els.cwfFieldError}`,
      )[0].textContent,
      `Name can't be blank`,
      'Correct default error message shows for empty name field after user clicks next button.',
    );
    await cth.failedValidation(
      `${testEls.afterGenerateChangesetWebformForm} ${testEls.nameAndEmailFormNameField}`,
      assert,
      {
        assertionSuffix: 'on empty name. field when user clicks next button',
      },
    );
    assert.strictEqual(
      findAll(
        `${testEls.afterGenerateChangesetWebformForm} ${testEls.nameAndEmailFormEmailField} ${els.cwfFieldError}`,
      ).length,
      2,
      'Two error messages show for empty email field after user clicks next button.',
    );
    assert.strictEqual(
      cth
        .fieldErrorText(
          `${testEls.afterGenerateChangesetWebformForm} ${testEls.nameAndEmailFormEmailField}`,
        )
        .join('|'),
      `Email can't be blank|Email must be a valid email address`,
      'Correct default error messages  for empty email field after user clicks next button.',
    );
    await cth.failedValidation(
      `${testEls.afterGenerateChangesetWebformForm} ${testEls.nameAndEmailFormEmailField}`,
      assert,
      {
        assertionSuffix: 'on empty email field when user clicks next button',
      },
    );

    assert
      .dom(testEls.step1)
      .exists(
        'User still on step 1 after clicking next, and there are validation errors.',
      );
    assert
      .dom(testEls.step2)
      .doesNotExist(
        'User not on step 2 after clicking next, and there are validation errors.',
      );
    await fillIn(
      `${testEls.afterGenerateChangesetWebformForm} ${testEls.nameAndEmailFormNameField} input`,
      'Lindsay Bluth',
    );
    await fillIn(
      `${testEls.afterGenerateChangesetWebformForm} ${testEls.nameAndEmailFormEmailField} input`,
      'lindsay@bluthcompany.com',
    );
    await click(
      `${testEls.afterGenerateChangesetWebformFeedback} ${testEls.nextButton}`,
    );
    assert
      .dom(testEls.step2)
      .exists(
        'User moves to step 2 after clicking next, and there are no validation errors.',
      );
    assert
      .dom(testEls.step1)
      .doesNotExist(
        'User not still on step 1 after clicking next, and there are no validation errors.',
      );
  });
});
