import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import testEls from '../acceptance/test-selectors';
import cloneDeep from 'lodash.clonedeep';
import allFieldTypesFieldSchema from 'test-app/utils/all-field-types form-schema';

module('Integration | Accessibility test', function (hooks) {
  setupRenderingTest(hooks);

  this.formSchema = {
    formSettings: {
      formName: 'ariaTest1',
    },
    fields: [
      {
        fieldId: 'emails',
        fieldLabel: 'Email',
        fieldType: 'input',
        inputType: 'email',
        hideLabel: true,
        validatesOn: ['insertWithValue'],
        defaultValue: 'test',
        validationRules: [
          {
            validationMethod: 'validateFormat',
            arguments: { type: 'email' },
          },
          {
            validationMethod: 'validatePresence',
            arguments: true,
          },
        ],
      },
    ],
  };

  test('Field with legend element shown', async function (assert) {
    await render(hbs`
      <Demos::RadioButtonGroupExampleOne />
    `);
    assert
      .dom('[data-test-id="field-controls"]')
      .hasAria(
        'labelledby',
        'radio-button-group-example-form-rgb-colours-field-label',
      );
    assert.dom('[data-test-id="field-controls"]').doesNotHaveAria('label');

    assert.dom('[data-test-id="field-controls"]').hasAttribute('role', 'group');
    assert
      .dom('[data-test-class="cwf-field-label"]')
      .hasAttribute(
        'id',
        'radio-button-group-example-form-rgb-colours-field-label',
      );
  });
  test('Field with hidden label and errors', async function (assert) {
    await render(hbs`
      <ChangesetWebform
      @formSchema={{this.formSchema}} 
      />`);
    const fieldId = 'aria-test1-form-emails-field';
    assert.dom('[data-test-id="field-controls"]').hasAria('label', 'Email');
    assert.dom('[data-test-id="field-controls"]').doesNotHaveAria('labelledby');
    assert
      .dom('[data-test-class="cwf-field-errors"]')
      .hasAttribute('id', `${fieldId}-errors`);
    assert
      .dom(`[data-test-id="${fieldId}"] input`)
      .hasAria('errormessage', `${fieldId}-errors`);
  });

  test('labels', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = allFieldTypesFieldSchema;
    await render(hbs`
      <ChangesetWebform
        @formSchema={{this.formSchema}} 
        @afterGenerateChangesetWebform={{this.createIds}}
      />`);
    this.fields.forEach((field) => {
      const fieldTypeBreakdown = getFieldTypeBreakdown(field);
      const fieldSelector = `[data-test-id="${field.id}"]`;
      assert
        .dom(
          `${fieldSelector} ${fieldTypeBreakdown.fieldLabelElement}[data-test-class="cwf-field-label"]`,
        )
        .hasAttribute('id', `${field.id}-label`);
      // Test that this matches for, where it is relevant, and labelledby where relevant
    });
  });

  test('ARIA errormessage - no errors present', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = allFieldTypesFieldSchema;
    await render(hbs`
      <ChangesetWebform
        @formSchema={{this.formSchema}} 
        @afterGenerateChangesetWebform={{this.createIds}}
      />`);
    this.fields.forEach((field) => {
      const fieldTypeBreakdown = getFieldTypeBreakdown(field);
      const fieldSelector = `[data-test-id="${field.id}"]`;

      assert
        .dom(`${fieldSelector} [data-test-class="cwf-field-errors"]`)
        .doesNotExist();
      assert.dom(fieldTypeBreakdown.selector).doesNotHaveAria('errormessage');
    });
  });

  test('ARIA errormessage - errors present', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = allFieldTypesFieldSchema;
    await render(hbs`
      <ChangesetWebform
        @formSchema={{this.formSchema}} 
        @afterGenerateChangesetWebform={{this.createIds}}
      />`);
    await click(testEls.cwfSubmitFormButton);
    this.fields.forEach((field) => {
      const fieldTypeBreakdown = getFieldTypeBreakdown(field);
      const fieldSelector = `[data-test-id="${field.id}"]`;

      assert
        .dom(`${fieldSelector} [data-test-class="cwf-field-errors"]`)
        .hasAttribute('id', `${field.id}-errors`);
      // Role alert ensures screen readers read it out as soon as it changes. https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alert_role
      assert
        .dom(`${fieldSelector} [data-test-class="cwf-field-errors"]`)
        .hasAttribute('role', 'alert');
      assert
        .dom(fieldTypeBreakdown.selector)
        .hasAria('errormessage', `${field.id}-errors`);
      if (['input', 'radioButtonGroup', 'textArea'].includes(field.fieldType)) {
        assert
          .dom(
            fieldTypeBreakdown.requiredElementSelector ||
              fieldTypeBreakdown.selector,
          )
          .hasAttribute('required');
      }
    });
  });

  test('ARIA describedby - field description not present', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema = cloneDeep(allFieldTypesFieldSchema);
    await render(hbs`
          <ChangesetWebform
            @formSchema={{this.formSchema}}
            @afterGenerateChangesetWebform={{this.createIds}}
            @debug={{true}}
          />`);
    this.fields.forEach((field) => {
      const fieldTypeBreakdown = getFieldTypeBreakdown(field);
      const fieldSelector = `[data-test-id="${field.id}"]`;
      assert
        .dom(`${fieldSelector} [data-test-class="cwf-field-description"]`)
        .doesNotExist('id', `${field.id}-description`);
      assert.dom(fieldTypeBreakdown.selector).doesNotHaveAria('describedby');
    });
  });

  test('ARIA describedby - field description present', async function (assert) {
    this.createIds = (changesetWebform) => {
      this.fields = changesetWebform.fields;
    };
    this.formSchema3 = cloneDeep(allFieldTypesFieldSchema);
    this.formSchema3.fields.forEach((field) => {
      field.fieldDescription = `This is a description for the "${field.fieldLabel}" field.`;
    });
    await render(hbs`
          <ChangesetWebform
            @formSchema={{this.formSchema3}}
            @afterGenerateChangesetWebform={{this.createIds}}
            @debug={{true}}
          />`);
    await this.pauseTest();
    this.fields.forEach((field) => {
      const fieldTypeBreakdown = getFieldTypeBreakdown(field);
      const fieldSelector = `[data-test-id="${field.id}"]`;
      assert
        .dom(`${fieldSelector} [data-test-class="cwf-field-description"]`)
        .hasAttribute('id', `${field.id}-description`);
      assert
        .dom(fieldTypeBreakdown.selector)
        .hasAria('describedby', `${field.id}-description`);
    });
  });
});

function getFieldTypeBreakdown(field) {
  console.log(field.fieldType);
  const map = [
    {
      fieldLabelElement: 'label',
      fieldType: 'input',
      selector: `[data-test-id="${field.id}"] input`,
    },
    {
      fieldLabelElement: 'label',
      fieldType: 'textarea',
      selector: `[data-test-id="${field.id}"] textarea`,
    },
    {
      fieldLabelElement: 'div',
      fieldType: 'powerSelect',
      selector: `[data-test-id="${field.id}"] .ember-power-select-trigger`,
    },
    {
      fieldLabelElement: 'div',
      fieldType: 'powerSelectCheckboxes',
      selector: `[data-test-id="${field.id}"] .ember-power-select-trigger`,
    },
    {
      fieldType: 'powerDatePicker',
      fieldLabelElement: 'div',
      selector: `[data-test-id="${field.id}"] .ember-basic-dropdown-trigger`,
    },
    {
      fieldType: 'radioButtonGroup',
      fieldLabelElement: 'legend',
      selector: `fieldset[data-test-id="${field.id}"]`,
      requiredElementSelector: `[data-test-id="${field.id}"] input[type="radio"]`,
    },
    {
      fieldType: 'checkboxGroup',
      fieldLabelElement: 'legend',
      selector: `fieldset[data-test-id="${field.id}"]`,
    },
    {
      fieldType: 'singleCheckbox',
      fieldLabelElement: 'label',
      selector: `[data-test-id="${field.id}"] input[type="checkbox"]`,
    },
    {
      fieldType: 'clone-group',
      fieldLabelElement: 'div ',
      selector: `[data-test-id="${field.id}"] .ember-power-select-trigger`,
    },
  ];
  return map.find((item) => item.fieldType === field.fieldType);
}

// required prop does not apply in a sematic way to checkbox groups (Ie that at least one must be selected)
// TODO title on all els when they are cloned
