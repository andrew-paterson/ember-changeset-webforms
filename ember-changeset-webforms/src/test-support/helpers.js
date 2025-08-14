import { find, findAll, click, waitUntil } from '@ember/test-helpers';
import els from './element-selectors.js';
import { camelize } from '@ember/string';

function _removeExtraSpaces(string, whiteSpaceReplacement = ' ') {
  string = string.trim();
  string = string
    .replace(/\s\s+/g, whiteSpaceReplacement)
    .replace(/\r?\n|\r/g, whiteSpaceReplacement);
  return string;
}

function _getElement(arg) {
  let element;
  if (typeof arg === 'string') {
    element = find(arg);
    if (!element) {
      throw `No element with selector ${arg} was found`;
    }
  } else {
    element = arg;
  }
  return element;
}

function _getElements(arg, indexes) {
  let elements;
  if (typeof arg === 'string') {
    elements = findAll(arg);
  } else {
    elements = arg;
  }
  if (indexes?.length) {
    elements = indexes.map((index) => elements[index]);
  }
  return elements;
}

async function _waitForMs(ms) {
  const startTimeEpoch = Date.now();
  await waitUntil(
    () => {
      return Date.now() - startTimeEpoch > ms;
    },
    { timeout: ms + 1000 },
  );
  return;
}

function fieldErrorText(arg) {
  const element = _getElement(arg);
  const errors = element.querySelectorAll(els.cwfFieldError);
  if (!errors) {
    return;
  }
  return Array.from(errors).map((error) => error.textContent.trim());
}

async function passedValidation(arg, assert, opts = {}) {
  const fieldElement = _getElement(arg);
  opts.validationBackgroundImage =
    opts.validBackgroundImage ||
    `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e")`;
  opts.validationBorderColour = opts.validBorderColour || 'rgb(25, 135, 84)';
  opts.validationBackgroundColour =
    opts.validBackgroundColour || 'rgb(25, 135, 84)';
  opts.presentValidationClass = opts.validClass || 'is-valid';
  opts.absentValidationClass = opts.invalidClass || 'is-invalid';
  opts.assertionPrefix = opts.assertionPrefix || 'Field passsed validation';
  opts.validationResult = 'valid';

  await _waitForMs(200);
  if (assert) {
    assert.ok(
      fieldElement.querySelectorAll(els.cwfFieldError).length === 0,
      `[${opts.assertionPrefix}] field does not have any error messages => ${opts.assertionSuffix}`,
    );
    assert
      .dom(fieldElement.querySelector(els.cwfFieldErrors))
      .doesNotExist(
        `[${opts.assertionPrefix}] field does not have error messages container element => ${opts.assertionSuffix}`,
      );
  }
  return checkValidation(fieldElement, assert, opts);
}

async function failedValidation(arg, assert, opts = {}) {
  const fieldElement = _getElement(arg);
  opts.validationBackgroundImage =
    opts.invalidBackgroundImage ||
    `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e")`;
  opts.validationBorderColour = opts.invalidBorderColour || 'rgb(220, 53, 69)';
  opts.validationBackgroundColour =
    opts.invalidBackgroundColour || 'rgb(220, 53, 69)';
  opts.presentValidationClass = opts.invalidClass || 'is-invalid';
  opts.absentValidationClass = opts.validClass || 'is-valid';
  opts.assertionPrefix = opts.assertionPrefix || 'Field failed validation';
  opts.validationResult = 'invalid';

  await _waitForMs(200);
  if (assert) {
    assert.ok(
      fieldElement.querySelectorAll(els.cwfFieldError).length >= 1,
      `[${opts.assertionPrefix}] field has at least one error message => ${opts.assertionSuffix}`,
    );
  }
  return checkValidation(fieldElement, assert, opts);
}

function checkValidation(fieldElement, assert, opts = {}) {
  opts.elementWithValidationClass = opts.elementWithValidationClass || [
    '.form-control',
    '.form-check-input',
  ];
  opts.validationBorderColourElements = opts.validationBorderColourElements || [
    '.form-control',
    '.form-check-input',
  ];
  opts.validationBackgroundColourElements =
    opts.validationBackgroundColourElements || [
      '.form-check-input.was-validated',
    ];
  opts.validationBackgroundImageElements =
    opts.validationBackgroundImageElements || ['.form-control'];
  const firstMatchingEl = (selectors) => {
    for (var selector of selectors) {
      const el = fieldElement.querySelector(selector);
      if (el) {
        return el;
      }
    }
    return null;
  };
  const validatingElementCSS = (selectors) => {
    const el = firstMatchingEl(selectors);
    if (el) {
      return window.getComputedStyle(el, null);
    }
    return null;
  };
  const validationBorderColourElementsCss = validatingElementCSS(
    opts.validationBorderColourElements,
  );
  const validationBackgroundImageElementsCss = validatingElementCSS(
    opts.validationBackgroundImageElements,
  );
  const validationBackgroundColourElementsCss = validatingElementCSS(
    opts.validationBackgroundColourElements,
  );

  const elementWithValidationClass =
    firstMatchingEl(opts.elementWithValidationClass) || fieldElement;

  if (assert) {
    assert
      .dom(elementWithValidationClass)
      .hasClass(
        opts.presentValidationClass,
        `[${opts.assertionPrefix}] ${opts.elementWithValidationClass} element has class '${opts.presentValidationClass}' => ${opts.assertionSuffix}`,
      );
    assert
      .dom(
        fieldElement.querySelector(opts.elementWithValidationClass) ||
          fieldElement,
      )
      .doesNotHaveClass(
        opts.absentValidationClass,
        `[${opts.assertionPrefix}] Form ${opts.elementWithValidationClass} element does not have class '${opts.absentValidationClass}' => ${opts.assertionSuffix}`,
      );

    if (validationBorderColourElementsCss) {
      assert.strictEqual(
        validationBorderColourElementsCss.getPropertyValue('border-color'),
        opts.validationBorderColour,
        `[${opts.assertionPrefix}] The appropriate element has ${opts.validationResult} border colour ${opts.validationBorderColour} => ${opts.assertionSuffix}`,
      );
    }

    if (validationBackgroundImageElementsCss) {
      assert.strictEqual(
        validationBackgroundImageElementsCss.getPropertyValue(
          'background-image',
        ),
        opts.validationBackgroundImage,
        `[${opts.assertionPrefix}] The appropriate element has ${opts.validationResult} background image => ${opts.assertionSuffix}`,
      );
    }

    if (validationBackgroundColourElementsCss) {
      assert.strictEqual(
        validationBackgroundColourElementsCss.getPropertyValue(
          'background-color',
        ),
        opts.validationBackgroundColour,
        `[${opts.assertionPrefix}] The appropriate element has ${opts.validationResult} background colour ${opts.validationBackgroundColour} => ${opts.assertionSuffix}`,
      );
    }
  }

  if (
    elementWithValidationClass.classList.contains(
      opts.presentValidationClass,
    ) &&
    [
      validationBorderColourElementsCss,
      validationBackgroundColourElementsCss,
      validationBackgroundImageElementsCss,
    ].filter((el) => el).length > 1 &&
    (!validationBorderColourElementsCss ||
      validationBorderColourElementsCss.getPropertyValue('border-color') ===
        opts.validationBorderColour) &&
    (!validationBackgroundColourElementsCss ||
      validationBackgroundColourElementsCss.getPropertyValue(
        'background-color',
      ) === opts.validationBackgroundColour) &&
    (!validationBackgroundImageElementsCss ||
      validationBackgroundImageElementsCss.getPropertyValue(
        'background-image',
      ) === opts.validationBackgroundImage)
  ) {
    return true;
  }
  return false;
}

async function allPassedValidation(arg, indexes) {
  const elements = _getElements(arg, indexes);
  let allPassed = true;
  for (var el of elements) {
    if (!(await passedValidation(el))) {
      allPassed = false;
    }
  }
  return allPassed;
}

async function allFailedValidation(arg, indexes) {
  const elements = _getElements(arg, indexes);
  let allFailed = true;
  for (var el of elements) {
    if (!(await failedValidation(el))) {
      allFailed = false;
    }
  }
  return allFailed;
}

async function wasValidated(arg) {
  return (await passedValidation(arg)) || (await failedValidation(arg));
}

async function allValidated(arg, indexes = []) {
  const els = _getElements(arg, indexes);
  if (!els.length) {
    return false;
  }
  for (var el of els) {
    if (!(await wasValidated(el))) {
      return false;
    }
  }
  return true;
}

async function noneValidated(arg, indexes = []) {
  const els = _getElements(arg, indexes);
  if (!els.length) {
    return false;
  }
  for (var el of els) {
    if (await wasValidated(el)) {
      return false;
    }
  }
  return true;
}

async function removeClone(arg, indexes = []) {
  const element = _getElement(arg);
  if (indexes?.length) {
    const elementsToClick = indexes.map(
      (index) => element.querySelectorAll(els.cwfRemoveClone)[index],
    );
    for (var el of elementsToClick) {
      await click(el);
    }
  } else {
    await click(element.querySelector(els.cwfRemoveClone));
  }
}

async function addClone(arg) {
  const element = _getElement(arg);
  await click(element.querySelector(els.cwfAddClone));
}

async function clickSubmitButton(arg) {
  const element = _getElement(arg);
  await click(element.querySelector(els.cwfSubmitButton));
}

function changesetWebformStateAsJSON(parentSelector, customTransforms) {
  const formElement = find(parentSelector);
  return Array.from(formElement.querySelectorAll('[data-test-cwf-field]')).map(
    (el) => {
      const obj = {
        name: el.getAttribute('data-test-id'),
        fieldType: el
          .getAttribute('data-test-class')
          .replace('cwf-field-type-', ''),
      };
      obj.validationStatus = validationStatus(el);
      const inputSelector = 'input:not([type=checkbox]):not([type=radio])';
      const input = el.querySelector(inputSelector);
      if (input) {
        obj.inputText = input.value;
        if (el.querySelector(`${inputSelector}:placeholder-shown`)) {
          obj.placeholder = input.getAttribute('placeholder');
        }
      }
      if (el.querySelector('[data-test-class="cwf-field-label"]')) {
        obj.label = _removeExtraSpaces(
          el.querySelector('[data-test-class="cwf-field-label"]').textContent,
        );
      }
      ['radio-button', 'checkbox'].forEach((elType) => {
        if (obj.fieldType === `${elType}-group`) {
          const items = Array.from(
            el.querySelectorAll(`[data-test-labelled-${elType}]`),
          ).map((item) => {
            return {
              label: _removeExtraSpaces(
                item.querySelector('label').textContent,
              ),
              checked: item.querySelector(
                `input[type="${elType.replace('-button', '')}"]`,
              ).checked,
            };
          });
          obj[camelize(`${elType}-options`)] = {
            items: items,
          };
        }
        if (customTransforms) {
          customTransforms(el, obj);
        }
      });
      if (obj.fieldType === 'single-checkbox') {
        obj[camelize(obj.fieldType)] = {
          checked: el.querySelector('input[type="checkbox"]').checked,
        };
      }
      if (['power-select', 'power-select-checkboxes'].includes(obj.fieldType)) {
        const elObject = {
          label: _removeExtraSpaces(
            el.querySelector('[data-test-class="cwf-field-label"]').textContent,
          ),
        };
        if (el.querySelector('.ember-power-select-placeholder')) {
          elObject.placeholder = _removeExtraSpaces(
            el.querySelector('.ember-power-select-placeholder').textContent,
          );
        }
        if (el.querySelector('.ember-power-select-selected-item')) {
          elObject.selectedItemText = _removeExtraSpaces(
            el.querySelector('.ember-power-select-selected-item').textContent,
          );
        }
        obj[camelize(obj.fieldType)] = elObject;
      }
      return obj;
    },
  );
}

function validationStatus(el) {
  if (!el.hasAttribute('data-test-validates')) {
    return 'not-applicable';
  }
  if (!el.hasAttribute('data-test-was-validated')) {
    return 'not-validated';
  }
  return el.getAttribute('data-test-validation-status');
}

export { fieldErrorText };
export { passedValidation };
export { failedValidation };
export { checkValidation };
export { allPassedValidation };
export { allFailedValidation };
export { wasValidated };
export { allValidated };
export { noneValidated };
export { removeClone };
export { addClone };
export { clickSubmitButton };
export { changesetWebformStateAsJSON };
export { validationStatus };
