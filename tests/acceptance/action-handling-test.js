import { visit, click, fillIn, focus, blur, find, findAll, typeIn } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import cth from 'ember-changeset-webforms/test-support/helpers';
import dummyEls from './test-selectors';
import els from 'ember-changeset-webforms/test-support/element-selectors';


module('Acceptance | Action handling', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('afterFieldEdit', async function(assert) {
    await visit('/docs/action-handling');
    await fillIn(`${dummyEls.afterFieldEditForm} ${dummyEls.firstNameField} input`, 'G');
    assert.dom(dummyEls.afterFieldEditFeedback).hasText(`The user's full name is "G ". The last updated field was First name. The value of settings.formName is names.`, 'All arguments are correctly sent with the afterFieldEdit action.');
    await typeIn(`${dummyEls.afterFieldEditForm} ${dummyEls.firstNameField} input`, 'ene');
    assert.dom(dummyEls.afterFieldEditFeedback).hasText(`The user's full name is "Gene ". The last updated field was First name. The value of settings.formName is names.`, 'afterFieldEdit runs when user types in an input field.');
  });

  test('afterFieldValidation', async function(assert) {
    await visit('/docs/action-handling');

    await focus(`${dummyEls.afterFieldValidationForm} ${dummyEls.nameField} input`);
    await blur(`${dummyEls.afterFieldValidationForm} ${dummyEls.nameField} input`);
    assert.dom(dummyEls.afterFieldValidationFeedback).hasText(`The user's name is "". The last validated field was Name. The first argument to the afterFieldValidation argument has the following values: value: "" validation: [Name can't be blank] The form has the following fields: name, email. The value of settings.formName is nameAndEmail.`, 'All arguments are correctly sent with the afterFieldValidation action, after blur, where there is one validation error.');
    await fillIn(`${dummyEls.afterFieldValidationForm} ${dummyEls.nameField} input`, 'Gene Parmesan');
    await blur(`${dummyEls.afterFieldValidationForm} ${dummyEls.nameField} input`);
    assert.dom(dummyEls.afterFieldValidationFeedback).hasText(`The user's name is "Gene Parmesan". The last validated field was Name. The Name has no validation errors when its value is Gene Parmesan. The form has the following fields: name, email. The value of settings.formName is nameAndEmail.`, 'All arguments are correctly sent with the afterFieldEdit action when field has no validation errors.');
    await focus(`${dummyEls.afterFieldValidationForm} ${dummyEls.emailField} input`);
    await blur(`${dummyEls.afterFieldValidationForm} ${dummyEls.emailField} input`);
    assert.dom(dummyEls.afterFieldValidationFeedback).hasText(`The user's name is "Gene Parmesan". The last validated field was Email. The first argument to the afterFieldValidation argument has the following values: value: "" validation: [Email can't be blank,Email must be a valid email address] The form has the following fields: name, email. The value of settings.formName is nameAndEmail.`, 'All arguments are correctly sent with the afterFieldValidation action, after blur of the email input, where there are two validation errors.');
    await fillIn(`${dummyEls.afterFieldValidationForm} ${dummyEls.emailField} input`, 'geeeeeeeene@parmesan.com');
    await blur(`${dummyEls.afterFieldValidationForm} ${dummyEls.emailField} input`);
    assert.dom(dummyEls.afterFieldValidationFeedback).hasText(`The user's name is "Gene Parmesan". The last validated field was Email. The Email has no validation errors when its value is geeeeeeeene@parmesan.com. The form has the following fields: name, email. The value of settings.formName is nameAndEmail.`, 'All arguments are correctly sent with the afterFieldEdit action when field has no validation errors.');
  });

  test('afterGenerateChangesetWebform', async function(assert) {
    await visit('/docs/action-handling');
    await click(`${dummyEls.afterGenerateChangesetWebformFeedback} ${dummyEls.nextButton}`);
   
    assert.equal(findAll(`${dummyEls.afterGenerateChangesetWebformForm} ${dummyEls.nameField} ${els.emberChangesetWebformsFieldError}`).length, 1, 'One error message shows for empty name field after user clicks next button.');
    assert.equal(findAll(`${dummyEls.afterGenerateChangesetWebformForm} ${dummyEls.nameField} ${els.emberChangesetWebformsFieldError}`)[0].textContent, `Name can't be blank`, 'Correct default error message shows for empty name field after user clicks next button.');
    assert.ok(find(`${dummyEls.afterGenerateChangesetWebformForm} ${dummyEls.nameField}`).classList.contains('invalid'), 'Empty name field gets class "invalid" when user clicks next button.');

    assert.equal(findAll(`${dummyEls.afterGenerateChangesetWebformForm} ${dummyEls.emailField} ${els.emberChangesetWebformsFieldError}`).length, 2, 'Two error messages show for empty email field after user clicks next button.');
    assert.equal(cth.fieldErrorText(`${dummyEls.afterGenerateChangesetWebformForm} ${dummyEls.emailField}`).join('|'), `Email can't be blank|Email must be a valid email address`, 'Correct default error messages  for empty email field after user clicks next button.');
    assert.ok(find(`${dummyEls.afterGenerateChangesetWebformForm} ${dummyEls.emailField}`).classList.contains('invalid'), 'Empty email field gets class "invalid" when user clicks next button.');
    assert.dom(dummyEls.step1).exists('User still on step 1 after clicking next, and there are validation errors.');
    assert.dom(dummyEls.step2).doesNotExist('User not on step 2 after clicking next, and there are validation errors.');
    await fillIn(`${dummyEls.afterGenerateChangesetWebformForm} ${dummyEls.nameField} input`, 'Lindsay Bluth');
    await fillIn(`${dummyEls.afterGenerateChangesetWebformForm} ${dummyEls.emailField} input`, 'lindsay@bluthcompany.com');
    await click(`${dummyEls.afterGenerateChangesetWebformFeedback} ${dummyEls.nextButton}`);
    assert.dom(dummyEls.step2).exists('User moves to step 2 after clicking next, and there are no validation errors.');
    assert.dom(dummyEls.step1).doesNotExist('User not still on step 1 after clicking next, and there are no validation errors.');
  });
});
