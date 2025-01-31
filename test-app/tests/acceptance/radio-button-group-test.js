import { visit, click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import testEls from './test-selectors';

module('Acceptance | Radio button group', function (hooks) {
  setupApplicationTest(hooks);

  test('Basics', async function (assert) {
    await visit('/docs/radio-button-group');
    assert
      .dom(`${testEls.radioButtonGroupExample1} ${testEls.currentValue}`)
      .doesNotExist('Current value not shown on load.');
    await click(
      `${testEls.radioButtonGroupExampleFormRgbColoursFieldRadioOptionFf0000} input`,
    );
    assert
      .dom(`${testEls.radioButtonGroupExample1} ${testEls.currentValue}`)
      .hasText(
        'Selected colour: ff0000',
        'Current value shows correct text after radio is checked, confirming that field value is updated correctly.',
      );
    await click(
      `${testEls.radioButtonGroupExampleFormRgbColoursFieldRadioOption00ff00} input`,
    );
    assert
      .dom(`${testEls.radioButtonGroupExample1} ${testEls.currentValue}`)
      .hasText(
        'Selected colour: 00ff00',
        'Current value shows correct text after radio is checked, confirming that field value is updated correctly.',
      );
  });

  test('With component label', async function (assert) {
    await visit('/docs/radio-button-group');
    assert
      .dom(`${testEls.radioButtonGroupExample2FormRadioButtons2Field}`)
      .hasText(
        'Custom label components Option 1 This is a custom label component applied all of the radio options Option 2 This is a custom label component applied all of the radio options Option 3 This is a custom component for the label of one specific radio option More info',
        'Both field.optionLabelComponent and option.labelComponent are loading correctly, and the option and props obejcts are passed in correctly to field.optionLabelComponent.',
      );
    await click(
      `${testEls.radioButtonGroupExample2} ${testEls.moreInfoToggler}`,
    );
    assert
      .dom(`${testEls.radioButtonGroupExample2FormRadioButtons2Field}`)
      .hasText(
        'Custom label components Option 1 This is a custom label component applied all of the radio options Option 2 This is a custom label component applied all of the radio options Option 3 This is a custom component for the label of one specific radio option More info This text was passed to the label component dynamically for this option, via the labelComponent.props object.',
        'The option and props obejcts are correctly passed in to option.labelComponent.',
      );
  });
});
