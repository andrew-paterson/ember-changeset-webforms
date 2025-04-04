import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, triggerKeyEvent, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | Action handling', function (hooks) {
  setupRenderingTest(hooks);

  this.formSchema = {
    formSettings: {
      formName: 'customFormSubmission',
    },
    fields: [
      {
        fieldId: 'name',
        fieldType: 'input',
        fieldLabel: 'Name',
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: true,
          },
        ],
      },
    ],
  };
  test('All actions', async function (assert) {
    await render(hbs`
      <ChangesetWebform
      @formSchema={{this.formSchema}} />`);
    await fillIn(
      '[data-test-id="custom-form-submission-form-name-field"] input',
      'Steve Holt',
    );
    await triggerKeyEvent(
      '[data-test-id="custom-form-submission-form-name-field"] input',
      'keyup',
      13,
    );
  });
});
