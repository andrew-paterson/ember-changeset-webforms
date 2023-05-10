import Component from '@ember/component';
import layout from '../../../templates/components/ember-changeset-webforms/form-elements/form-submit-button';
import dynamicClassNames from 'ember-changeset-webforms/utils/dynamic-class-names';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: "",
  customType: 'button',

  requestInFlightClassNames: computed('changesetWebform', function() {
    return dynamicClassNames('submitButton', this.changesetWebform);
  })
});