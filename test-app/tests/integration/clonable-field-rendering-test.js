import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import testEls from '../acceptance/test-selectors';
import cloneDeep from 'lodash.clonedeep';

module('Integration | Component | Clonable field rendering', function (hooks) {
  setupRenderingTest(hooks);

  this.formSchema = {
    formSettings: {
      formName: 'addEmails',
    },
    fields: [
      {
        fieldId: 'emails',
        fieldLabel: 'User emails',
        fieldType: 'clone-group',
        minClones: 2,
        maxClones: 4,
        validationRules: [
          {
            validationMethod: 'validateLength',
            arguments: {
              description: 'emails',
              message: 'Too many {description} (maximum is {max}).',
              max: 4,
            },
          },
        ],
        cloneButtonText: 'Add email address',
        cloneFieldSchema: {
          fieldLabel: 'Email',
          fieldType: 'input',
          inputType: 'email',
          hideLabel: true,
          validatesOn: ['insertWithValue'],
          validationRules: [
            {
              validationMethod: 'validateFormat',
              arguments: { type: 'email' },
            },
            {
              validationMethod: 'validatePresence',
              arguments: true,
            },
            {
              validationMethod: 'uniqueClone',
              arguments: {
                description: 'email',
              },
            },
          ],
        },
      },
    ],
  };

  test('Clone group actions - default position', async function (assert) {
    await render(hbs`
      <ChangesetWebform
      @formSchema={{this.formSchema}}
      />`);
    assert
      .dom(`${testEls.cwfCloneGroupItems} ~ ${testEls.cwfCloneGroupActions}`)
      .exists(
        'Clone group actions are rendered after the clone group items by default.',
      );
  });

  test('Clone group actions - cloneGroupActionsPosition === cloneGroupWrapper', async function (assert) {
    this.formSchema2 = cloneDeep(this.formSchema);
    this.formSchema2.fields[0].cloneGroupActionsPosition = 'cloneGroupWrapper';
    await render(hbs`
      <ChangesetWebform
      @formSchema={{this.formSchema2}}
      />`);
    assert
      .dom(`${testEls.cwfCloneGroupItems} ~ ${testEls.cwfCloneGroupActions}`)
      .exists('Clone group actions are rendered after the clone group items.');
  });

  test('Clone field actions - cloneGroupActionsPosition === labelWrapper', async function (assert) {
    this.formSchema3 = cloneDeep(this.formSchema);
    this.formSchema3.fields[0].cloneGroupActionsPosition = 'labelWrapper';
    await render(hbs`
      <ChangesetWebform
      @formSchema={{this.formSchema3}} 
      />`);
    assert
      .dom(`${testEls.cwfFieldLabelWrapper} ~ ${testEls.cwfCloneGroupItems}`)
      .exists('Clone group actions are rendered before the clone group items.');
  });
});
