import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  fillIn,
  waitUntil,
  waitFor,
  click,
  focus,
  blur,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import FormField from 'ember-changeset-webforms/utils/form-field';
import ChangesetWebformClass from 'ember-changeset-webforms/utils/changeset-webform-class';
import testEls from '../acceptance/test-selectors';
const nameFieldInput = `${testEls.customFormSubmissionFormNameField} input`;
const emailFieldInput = `${testEls.customFormSubmissionFormEmailField} input`;
const actionCalls = {};
let changesetWebform;
let serverResponseType;

function allItemsInArray(subset, superset) {
  return subset.every((item) => superset.includes(item));
}

function isChangesetWebformObject(obj) {
  return {
    name: 'changesetWebformObject',
    present: obj instanceof ChangesetWebformClass,
  };
}

function isFormField(obj) {
  return {
    name: 'FormField',
    present: obj instanceof FormField,
  };
}

function isEventName(arg, opts) {
  return {
    name: 'eventName',
    present: arg === opts.eventName,
  };
}

function isValue(arg, opts) {
  return {
    name: 'value',
    present: arg === opts.value,
  };
}

function isBrowserEvent(arg) {
  return {
    name: 'browserEvent',
    present: arg instanceof Event,
  };
}

function isValidationError(arg, opts) {
  return {
    name: 'validationError',
    present: opts.passedValidation
      ? arg === undefined
      : arg?.validation && Array.isArray(arg.validation),
  };
}

function isChangesetDataObject(arg, opts) {
  return {
    name: 'changesetDataObject',
    present: JSON.stringify(arg) === JSON.stringify(opts.changeset.data),
  };
}

function isComponentArgs(arg) {
  const expectedArgkeys = [
    'formSchema',
    'data',
    'beforeResetForm',
    'afterResetForm',
    'beforeClearForm',
    'afterClearForm',
    'onFormSubmit',
  ];
  return {
    name: 'componentArguments',
    present: allItemsInArray(expectedArgkeys, Object.keys(arg)),
  };
}

function isValidationResult(arg) {
  const firstFieldFirstValidation = arg[0][0];
  return {
    name: 'validationResult',
    present:
      Array.isArray(arg) &&
      (firstFieldFirstValidation ===
        document.querySelector(nameFieldInput).value ||
        allItemsInArray(
          ['value', 'validation'],
          Object.keys(firstFieldFirstValidation),
        )),
  };
}

function isSuccessServerResponse(arg) {
  return {
    name: 'successServerResponse',
    present:
      arg &&
      typeof arg === 'object' &&
      Object.keys(arg).length === 1 &&
      arg.name === 'Steve Holt',
  };
}

function isErrorServerResponse(arg) {
  return {
    name: 'errorServerResponse',
    present:
      arg && arg instanceof Error && arg.message === 'Server error occurred',
  };
}

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

  this.formSchema2 = {
    formSettings: {
      formName: 'customFormSubmission',
      resetFormButton: true,
      clearFormButton: true,
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
        fieldId: 'email',
        fieldType: 'input',
        fieldLabel: 'Name',
        defaultValue: 'steveholt@bluthcompany.com',
        validationRules: [
          {
            validationMethod: 'validatePresence',
            arguments: true,
          },
        ],
      },
    ],
  };

  function checkActionArgs(assert, actionName, opts = {}) {
    const expectedArgsTypes = {
      afterGenerateChangesetWebform: [isChangesetWebformObject],
      afterFieldInserted: [isFormField, isChangesetWebformObject],
      onFieldValueChange: [isFormField, isChangesetWebformObject],
      afterFieldRemoved: [isFormField, isChangesetWebformObject],
      afterFieldValidation: [
        isFormField,
        isChangesetWebformObject,
        isValidationError,
      ],
      onUserInteraction: [
        isFormField,
        isChangesetWebformObject,
        isEventName,
        isValue,
        isBrowserEvent,
      ],
      submitAction: [isChangesetDataObject, isChangesetWebformObject],
      onFormSubmit: [isChangesetWebformObject, isComponentArgs],
      beforeClearForm: [isChangesetWebformObject],
      afterClearForm: [isChangesetWebformObject],
      beforeResetForm: [isChangesetWebformObject],
      afterResetForm: [isChangesetWebformObject],
      afterValidateFields: [isChangesetWebformObject, isValidationResult],
      beforeSubmitForm: [isChangesetWebformObject],
      submitSuccess: [isSuccessServerResponse, isChangesetWebformObject],
      submitError: [isErrorServerResponse, isChangesetWebformObject],
    };
    const expectedArgTypes = expectedArgsTypes[actionName];
    const actualArgs = actionCalls[actionName];
    const argChecks = expectedArgTypes.map((expectedArgTypeFunc, index) => {
      if (typeof expectedArgTypeFunc !== 'function') {
        return;
      }
      return expectedArgTypeFunc(actualArgs[index], opts);
    });
    assert.ok(
      argChecks.length === expectedArgTypes.length &&
        argChecks.filter((actionCall) => actionCall.present !== true).length ===
          0,
      `[${actionName}] action was called with the correct arguments: ${JSON.stringify(argChecks.map((item) => item.name))}`,
    );
  }

  this.generalAction = (...args) => {
    const actionName = args[0];
    const argsPassedByAction = args.slice(1);
    if (actionName === 'afterGenerateChangesetWebform' && !changesetWebform) {
      changesetWebform = argsPassedByAction[0];
    }
    actionCalls[actionName] = argsPassedByAction;
    if (actionName === 'submitAction') {
      if (serverResponseType === 'error') {
        throw new Error('Server error occurred');
      } else {
        return {
          name: 'Steve Holt',
        };
      }
    }
    return;
  };
  test('All actions', async function (assert) {
    await render(hbs`
      <ChangesetWebform
        @formSchema={{this.formSchema}} 
        @afterGenerateChangesetWebform={{fn this.generalAction "afterGenerateChangesetWebform"}}
        @onFieldValueChange={{fn this.generalAction "onFieldValueChange"}}
        @afterFieldInserted={{fn this.generalAction "afterFieldInserted"}}
        @afterFieldRemoved={{fn this.generalAction "afterFieldRemoved"}}
        @afterFieldValidation={{fn this.generalAction "afterFieldValidation"}}
        @onUserInteraction={{fn this.generalAction "onUserInteraction"}}
        @beforeResetForm={{fn this.generalAction "beforeResetForm"}}
        @beforeClearForm={{fn this.generalAction "beforeClearForm"}}  
        @afterValidateFields={{fn this.generalAction "afterValidateFields"}}
        @beforeSubmitForm={{fn this.generalAction "beforeSubmitForm"}}
        @submitAction={{fn this.generalAction "submitAction"}}
        @submitSuccess={{fn this.generalAction "submitSuccess"}}
        @submitError={{fn this.generalAction "submitError"}}
      />`);
    checkActionArgs(assert, 'afterGenerateChangesetWebform');
    checkActionArgs(assert, 'afterFieldInserted');
    await click(testEls.cwfSubmitFormButton);
    checkActionArgs(assert, 'afterValidateFields');
    changesetWebform.setFieldOmission('name', true);
    await waitUntil(() => actionCalls.afterFieldRemoved);
    checkActionArgs(assert, 'afterFieldRemoved');
    changesetWebform.setFieldOmission('name', false);
    await waitFor('[data-test-id="custom-form-submission-form-name-field"]');
    await focus(nameFieldInput);
    await blur(nameFieldInput);
    checkActionArgs(assert, 'afterFieldValidation');
    await fillIn(nameFieldInput, 'Steve Holt');
    await blur(nameFieldInput);
    checkActionArgs(assert, 'onUserInteraction', {
      value: 'Steve Holt',
      eventName: 'focusOut',
    });
    checkActionArgs(assert, 'afterFieldValidation', {
      passedValidation: true,
    });
    serverResponseType = 'error';

    await click(testEls.cwfSubmitFormButton);
    checkActionArgs(assert, 'afterValidateFields');
    checkActionArgs(assert, 'beforeSubmitForm');
    checkActionArgs(assert, 'submitAction', {
      changeset: changesetWebform.changeset,
    });
    checkActionArgs(assert, 'submitError');
    serverResponseType = 'success';
    await click(testEls.cwfSubmitFormButton);

    checkActionArgs(assert, 'submitSuccess');
  });

  test('All actions 2', async function (assert) {
    await render(hbs`
      <ChangesetWebform
        @formSchema={{this.formSchema2}}
        @data={{hash name="Steve Holt"}} 
        @beforeResetForm={{fn this.generalAction "beforeResetForm"}}
        @afterResetForm={{fn this.generalAction "afterResetForm"}}
        @beforeClearForm={{fn this.generalAction "beforeClearForm"}}   
        @afterClearForm={{fn this.generalAction "afterClearForm"}}
        @onFormSubmit={{fn this.generalAction "onFormSubmit"}}
      />`);
    assert
      .dom(nameFieldInput)
      .hasValue('Steve Holt', 'Name field has preloaded data from data hash');
    assert
      .dom(emailFieldInput)
      .hasValue(
        'steveholt@bluthcompany.com',
        'Email field has preloaded data from defaultValue field prop',
      );
    await click(testEls.cwfClearFormButton);
    checkActionArgs(assert, 'beforeClearForm');
    checkActionArgs(assert, 'afterClearForm');
    assert
      .dom(nameFieldInput)
      .hasValue(
        '',
        'Name field is cleared when user clicks Clear Form button.',
      );
    assert
      .dom(emailFieldInput)
      .hasValue(
        '',
        'Email field is cleared when user clicks Clear Form button.',
      );

    await click(testEls.cwfResetFormButton);
    assert
      .dom(nameFieldInput)
      .hasValue(
        'Steve Holt',
        'Name field returns to inital proloaded value when user clicks Discard Chnages button.',
      );
    assert
      .dom(emailFieldInput)
      .hasValue(
        'steveholt@bluthcompany.com',
        'Email field returns to inital proloaded value when user clicks Discard Chnages button.)',
      );
    await fillIn(nameFieldInput, 'Tobias Funke');
    await blur(nameFieldInput);
    await fillIn(emailFieldInput, 'tobiasfunke@bluthcompany.com');
    await blur(emailFieldInput);
    assert
      .dom(nameFieldInput)
      .hasValue(
        'Tobias Funke',
        'Name field is cleared when user clicks Clear Form button.',
      );
    assert
      .dom(emailFieldInput)
      .hasValue(
        'tobiasfunke@bluthcompany.com',
        'Email field is cleared when user clicks Clear Form button.',
      );
    await click(testEls.cwfSubmitFormButton);
    checkActionArgs(assert, 'onFormSubmit');
  });
});
