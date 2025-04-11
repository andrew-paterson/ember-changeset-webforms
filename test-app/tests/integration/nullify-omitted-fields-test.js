import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import testEls from '../acceptance/test-selectors';
import cloneDeep from 'lodash.clonedeep';

module('Integration | Component | Nullify omitted fields', function (hooks) {
  setupRenderingTest(hooks);

  this.formSchema = {
    formSettings: {
      formName: 'nullifyOmittedFields',
    },
    fieldSettings: {
      resetWhenOmitted: false,
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
      {
        fieldId: 'emailToggler',
        fieldType: 'clicker',
        clickerText: 'Toggle email field',
      },
      {
        fieldId: 'email',
        fieldType: 'input',
        fieldLabel: 'Name',
        omitted: true,
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: true,
          },
        ],
      },
    ],
  };

  let changesetEmailProp;
  this.afterGenerateChangesetWebform = (changesetWebform) => {
    changesetEmailProp = changesetWebform.changeset.data.email;
  };

  this.submitAction = (data) => {
    changesetEmailProp = data.email;
  };

  this.onUserInteraction = (formField, changesetWebform) => {
    if (formField.fieldId === 'emailToggler') {
      const emailField = changesetWebform.fields.find(
        (field) => field.fieldId === 'email',
      );
      emailField.setOmission(!emailField.omitted);
    }
  };

  test('Omitted on load', async function (assert) {
    changesetEmailProp = null;
    await render(hbs`
      <ChangesetWebform
      @formSchema={{this.formSchema}}
      @data={{hash name="Steve Holt" email="steveholt@bluthcompany.com"}}
      @submitAction={{this.submitAction}}
      @afterGenerateChangesetWebform={{this.afterGenerateChangesetWebform}}
      />`);
    assert.strictEqual(
      changesetEmailProp,
      'steveholt@bluthcompany.com',
      `Changeset email prop === ${changesetEmailProp} on when changesetWebform is first generated`,
    );
    assert
      .dom(`[data-test-id="nullify-omitted-fields-form-email-field"]`)
      .doesNotExist('Omitted email field does not exist on load');
    await click(testEls.cwfSubmitFormButton);

    assert.strictEqual(
      changesetEmailProp,
      null,
      `Changeset email prop === ${changesetEmailProp} on when form is submitted`,
    );
  });

  test('Omitted by setting omitted prop in callback', async function (assert) {
    changesetEmailProp = null;
    this.formSchema2 = cloneDeep(this.formSchema);
    const emailField = this.formSchema2.fields.find(
      (field) => field.fieldId === 'email',
    );
    delete emailField.omitted;
    await render(hbs`
      <ChangesetWebform
      @formSchema={{this.formSchema2}}
      @data={{hash name="Steve Holt" email="steveholt@bluthcompany.com"}}
      @submitAction={{this.submitAction}}
      @afterGenerateChangesetWebform={{this.afterGenerateChangesetWebform}}
      @onUserInteraction={{this.onUserInteraction}}
      />`);
    assert.strictEqual(
      changesetEmailProp,
      'steveholt@bluthcompany.com',
      `Changeset email prop === ${changesetEmailProp} on when changesetWebform is first generated`,
    );
    assert
      .dom(`[data-test-id="nullify-omitted-fields-form-email-field"]`)
      .exists('Omitted email field exists on load.');
    await click(testEls.cwfClickerElement);
    assert
      .dom(`[data-test-id="nullify-omitted-fields-form-email-field"]`)
      .doesNotExist(
        'Omitted email field does not exist after clicking toggle email button..',
      );
    await click(testEls.cwfSubmitFormButton);

    assert.strictEqual(
      changesetEmailProp,
      null,
      `Changeset email prop === ${changesetEmailProp} on when form is submitted`,
    );
  });
  test('Omitted dynamically', async function (assert) {
    changesetEmailProp = null;
    this.formSchema3 = cloneDeep(this.formSchema);
    const emailField = this.formSchema3.fields.find(
      (field) => field.fieldId === 'email',
    );
    this.formSchema3.fields[1] = {
      fieldId: 'hasEmail',
      fieldType: 'radioButtonGroup',
      options: ['Yes', 'No'],
    };
    emailField.omitted = {
      returns: true,
      where: 'anyConditionsTrue',
      conditions: [
        {
          fieldId: 'hasEmail',
          valueEquals: 'No',
        },
      ],
    };
    await render(hbs`
      <ChangesetWebform
      @formSchema={{this.formSchema3}}
      @data={{hash name="Steve Holt" email="steveholt@bluthcompany.com"}}
      @submitAction={{this.submitAction}}
      @afterGenerateChangesetWebform={{this.afterGenerateChangesetWebform}}
      />`);
    assert.strictEqual(
      changesetEmailProp,
      'steveholt@bluthcompany.com',
      `Changeset email prop === ${changesetEmailProp} on when changesetWebform is first generated`,
    );
    await click(
      '[data-test-id="nullify-omitted-fields-form-has-email-field-radio-option-no"] input',
    );
    await click(testEls.cwfSubmitFormButton);
    assert.strictEqual(
      changesetEmailProp,
      null,
      `Changeset email prop === ${changesetEmailProp} on when form is submitted`,
    );
  });
});
