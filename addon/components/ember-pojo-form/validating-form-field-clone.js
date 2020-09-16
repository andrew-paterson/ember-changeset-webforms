import Component from '@ember/component';
import layout from '../../templates/components/ember-pojo-form/validating-form-field-clone';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  emberPojoForms: service(),
  classNames: ['ember-pojo-form-field-clone'],
  'data-test-class': 'cloned-field',

  didInsertElement: function() {
    //Code below will maintain validation colours when component is re-rendered.
    var index = this.get('index');
    var masterFormField = this.get('masterFormField');
    var clonedFormField = this.get('clonedFormField');
    var changesetProp = this.get('changesetProp');
    if (changesetProp.get(masterFormField.fieldId)[index]) {
      this.validateProperty(changesetProp, clonedFormField, 'insert');
    }
  },

  cloneErrors: computed('changesetProp.error', function() {
    var index = this.get('index');
    var validationErrors = ((this.get(`changesetProp.error.${this.get('masterFormField.fieldId')}.validation`)) || [])[0];
    if (!validationErrors) { return; }
    return validationErrors[index];
  }),

  displayValidation: computed('changesetProp.error', 'clonedFormField.{focussed,wasValidated,fieldErrors,fieldErrors.@each}', function() {
    var index = this.get('index');
    var clonedFormField = this.get('clonedFormField');
    if (!clonedFormField) { return; }
    if (!this.validationEventObj(clonedFormField.validationEvents, 'keyUp') && clonedFormField.get('focussed')) {
      return;
    }   
    var masterFieldvalidationErrors = ((this.get(`changesetProp.error.${this.get('masterFormField.fieldId')}.validation`)) || []);
    var clonedFieldValidationErrors = masterFieldvalidationErrors[0];
    if (!this.get('clonedFormField.wasValidated')) { return; }
    if ((clonedFormField.fieldErrors || []).length > 0) {
      return 'invalid';
    }
    if (!masterFieldvalidationErrors) { return; }
    if (masterFieldvalidationErrors.length === 0) { return 'valid'; }
    if (!clonedFieldValidationErrors[index]) { return; }
    if (clonedFieldValidationErrors[index].length === 0) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }),
  removeIconComponent: computed('emberPojoForms.removeCloneIcon', 'formField.removeButtonIcon', function() {
  }),

  actions: {
    onFocusOutClone(index, clonedFormField, value) {
      this.onFocusOut(clonedFormField, this.updatedGroupValue(value, index));
    },

    onFocusInClone(index, clonedFormField) {
      this.onFocusIn(clonedFormField);
    },

    onKeyUpClone(index, clonedFormField, value, event) {
      this.onKeyUp(clonedFormField, this.updatedGroupValue(value, index), event);
      // Must always validate on keyUp because when changeset prop is updated, the validation errors for that prop are removed until validated again- this is dude to skipValidation.
      this.validateProperty(this.get('changesetProp'), clonedFormField);
    },

    onUserInteractionClone(index, clonedFormField, value) {
      this.onUserInteraction(clonedFormField, this.updatedGroupValue(value, index));
    },

    onChangeClone(index, clonedFormField, value) {
      this.onChange(clonedFormField, this.updatedGroupValue(value, index));
    }
  },

  validationEventObj(validationEvents, eventType) { // TODO this is duplicated in validating form field.
    return validationEvents.find(validationEvent => {
      return validationEvent.event === eventType;
    });
  },

  updatedGroupValue(value, index) {
    var masterFormField = this.get('masterFormField');
    masterFormField.set('lastUpdatedClone', {
      index: index,
      previousValue: this.get('groupValue')[index],
      previousLength: this.get('groupValue').length
    });
    var groupValue = [...this.get('groupValue')] || []; // Must use spread to copy the array and avoid mutating the original below, which would break the groupValue CP.
    groupValue[index] = value;
    return groupValue;
  },
});