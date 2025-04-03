import Component from '@glimmer/component';
import { action } from '@ember/object';
export default class ShowClasses extends Component {
  @action
  didInsert() {
    setTimeout(() => {
      const elements = document.querySelectorAll('[data-test-cwf-field] input');
      Array.from(elements).forEach((el) => {
        el.addEventListener('change', () => {
          this.doTheThing();
        });
        el.addEventListener('keyup', () => {
          this.doTheThing();
        });
        el.addEventListener('blur', () => {
          this.doTheThing();
        });
      });
      this.doTheThing();
    });
  }
  @action
  doTheThing() {
    const labelEls = Array.from(
      document.querySelectorAll('[data-test-class="cwf-field-label"]'),
    ).concat(
      Array.from(
        document.querySelectorAll('[data-test-labelled-radio-button] label'),
      ),
    );
    labelEls.forEach((labelEl) => {
      const newTextContent = `class="${labelEl.className}"`;
      const existing = labelEl.querySelector('.element-classlist');
      if (existing) {
        existing.textContent = newTextContent;
        return;
      }
      const newEl = document.createElement('span');
      newEl.textContent = newTextContent;

      newEl.classList.add('monospaced');
      newEl.classList.add('inline-block');
      newEl.classList.add('element-classlist');
      newEl.classList.add('ms-1');
      newEl.classList.add('rounded');
      newEl.classList.add('box-arrow');
      labelEl.appendChild(newEl);
      if (newEl.getBoundingClientRect().height > 35) {
        newEl.classList.add('arrow-direction-up');
      } else {
        newEl.classList.add('arrow-direction-left');
      }
    });
  }
}
