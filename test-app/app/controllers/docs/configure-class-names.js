import Controller from '@ember/controller';
import addonDefaults from 'ember-changeset-webforms/utils/addon-defaults';

export default class ConfigureClassnames extends Controller {
  fieldTypes = addonDefaults.fieldTypes.map((item) => item.fieldType);
}
