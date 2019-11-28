import Component from '@ember/component';
import { computed } from '@ember/object';
import generateEmberValidatingFormFields from '../../utils/generate-ember-validating-form-fields';
import layout from '../../templates/components/ember-pojo-form/validating-form';
import { inject as service } from '@ember/service';
import validateFields from '../../utils/validate-fields';
import castAllowedFields from '../../utils/cast-allowed-fields';
import createChangeset from '../../utils/create-changeset';
import generateEmberValidatingFormField from '../../utils/generate-ember-validating-form-field';

export default Component.extend({
  layout,
  emberPojoForms: service(),
  classNameBindings: ['validationFailed:validation-failed'],
  classNames: ['ember-pojo-form'],

  formObject: computed('formSchema', 'settings', 'fields', function() {
    var formSchema;
    if (this.get('formSchema')) {
      formSchema = this.get('formSchema');
    } else if (this.get('settings')) {
      formSchema = {
        settings: this.get('settings'),
        fields: this.get('fields')
      };
    }
    return generateEmberValidatingFormFields(formSchema);
  }),  

  changeset: computed('formObject.{formFields}', function() {
    console.log('changeset');
    return createChangeset(this.get('formObject.formFields'), this.get('data'), this.get('customValidators'));
  }),

  formName: computed('formObject', function() {
    var formName = this.get('formObject.formMetaData.formName');
    if (!formName) {
      throw Error(`Your form schema must have a formName property.`);
    }

    if (formName.match(/[^a-z0-9]/gi,'')) {
      throw Error(`The formName property in your form schema may only contain alphanumeric characters.`);
    }
    return formName;
  }),

  formMetaData: computed('formObject', 'formName', function() {
    var storedformObject = this.get(`storageService.${this.get('formName')}`);
    if (storedformObject) {
      return storedformObject.formMetaData;
    } else {
      return this.get('formObject.formMetaData');
    }
  }),

  formFields: computed('formObject', 'formObject.formFields', 'formName', function() {
    console.log('formFields');
    var storedformObject = this.get(`storageService.${this.get('formName')}`);
    if (storedformObject) {
      return storedformObject.formFields;
    } else {
      return this.get('formObject.formFields');
    }
  }),

  submitButtonText: computed('formMetaData', function() {
    return this.get('formMetaData.submitButtonText') ? this.get('formMetaData.submitButtonText') : "Submit";
  }),

  resetButtonText: computed('formMetaData', function() {
    return this.get('formMetaData.resetButtonText') ? this.get('formMetaData.resetButtonText') : "Reset";
  }),

  validationFailed: computed('formMetaData.validationStatus', function() {
    return this.get('formMetaData.validationStatus') === 'failed';
  }),

  validationPassed: computed('formMetaData.validationStatus', function() {
    return this.get('formMetaData.validationStatus') === 'passed';
  }),

  needsValidation: computed('formFields', 'formFields.@each', function() {
    var formFields = this.get('formFields') || [];
    return formFields.find(field => {
      field.set('validationRules', field.validationRules || []);
      return field.validationRules.length > 0;
    });
  }),

  formValidationClass: computed('changeset.{isInvalid,isValid}', function() {
    if (this.get('changeset.isInvalid')) {
      return 'validation-failed';
    }
    if (this.get('changeset.isValid')) {
      return 'validation-passed';
    }
    return;
  }),

  willDestroyElement: function() {
    var formMetaTitle = this.get('formMetaData.formName');
    var storageService = this.get("storageService");
    if (!storageService) {return;}
    var form = this.get("formObject");
    storageService.set(formMetaTitle, form);
  },

  actions: {
    cloneField(cloneGroupName) {
      var fieldObjects = this.get('formObject.formFields');
      var previouslyValidated = fieldObjects.filter(field => {
        return field.wasValidated;
      }).map(item => {
        return item.fieldId;
      });
      var originalField = this.get('formSchema.fields').find((field, index) => {
        return field.fieldId === cloneGroupName;
      });

      var newField = generateEmberValidatingFormField(originalField);
      var cloneGroup = fieldObjects.filter(fieldObject => {
        return fieldObject.cloneGroupName === newField.cloneGroupName;
      });
      cloneGroup.setEach('lastClone', false);
      var lastCloneInView = cloneGroup[cloneGroup.length - 1];
      var lastCloneInViewIndex = this.get('formObject.formFields').indexOf(lastCloneInView);
      var sortedCloneGroup = cloneGroup.sort((a, b) => {
        return b.cloneGroupNumber - a.cloneGroupNumber;
      });
      

      newField.set('cloneGroupNumber', sortedCloneGroup[0].cloneGroupNumber + 1);
      newField.set('fieldId', `${newField.fieldId}-${newField.cloneGroupNumber}`);

      this.get('changeset').save().then(result => {
        this.set('data', result.data);
        // this.get('formObject.formFields').pushObject(newField);
        var test = [
          // part of the array before the specified index
          ...this.get('formObject.formFields').slice(0, lastCloneInViewIndex),
          // inserted items
          newField,
          // part of the array after the specified index
          ...this.get('formObject.formFields').slice(lastCloneInViewIndex)
        ];
        console.log(test);
        this.set('formObject.formFields', test);
        // console.log(this.get('formObject.formFields'));
        previouslyValidated.forEach(item => {
          this.get('changeset').validate(item);
        });
      });
    },

    customTransforms(fieldId, changeset) {
       if (this.get('customTransforms')) {
        this.customTransforms(this.get('formFields'), fieldId, this.get('formMetaData'), changeset);
      }
    },

    submit(changeset, modelName) {
      validateFields(this.get('formFields'), changeset).then(validateResponse => {
        if (changeset.isValid) {
          castAllowedFields(this.get('formFields'), changeset);
          this.set("requestInFlight", true);
          if (this.get('submitAction')) {
            // TODO this must first save the changeset.
            this.submitAction(changeset.data, modelName, changeset).then(submitActionResponse => {
              this.set("requestInFlight", false);
              if (this.get('saveSuccess')) {
                this.saveSuccess(submitActionResponse, this.get('formFields'), this.get('formMetaData'), changeset);
              }
              console.log(this.get('formMetaData'));
              if (this.get('formMetaData.resetAfterSubmit')) {
                // this.send('resetForm');
              }
            }).catch(error => {
              this.set("requestInFlight", false);
              if (this.get('saveFail')) {
                this.saveFail(error, this.get('formFields'), this.get('formMetaData'), changeset);
              }
            });
          } else {
            changeset.save().then(saveChangesetResponse => {
              this.set("requestInFlight", false);
              if (this.get('saveSuccess')) {
                this.saveSuccess(saveChangesetResponse, this.get('formFields'), this.get('formMetaData'), changeset);
              }
              if (this.get('formMetaData.resetAfterSubmit')) {
                this.send('resetForm');
              }
            }).catch(error => {
              if (this.get('saveFail')) {
                this.saveFail(error, this.get('formFields'), this.get('formMetaData'), changeset);
              }
              this.set("requestInFlight", false);
            });
          }
        } else {
          if (this.get('formValidationFailed')) {
            this.formValidationFailed(validateResponse, changeset);
          }
        }
      }).catch(err => {
        console.log(err);
      });
    },

    resetForm() {
      this.set('formObject', generateEmberValidatingFormFields(this.get('formSchema')));
      if (this.afterReset) { 
        this.afterReset(); // TODO this must send the changeset
      } 
    }
    
  }
});