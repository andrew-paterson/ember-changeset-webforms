import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {
  this.route('misc');
  docsRoute(this, function () {
    this.route('basic-usage');
    this.route('configuration-options');
    this.route('creating-custom-fields');
    this.route('action-handling');
    this.route('form-settings');
    this.route('field-settings');
    this.route('form-submission');
    this.route('field-validation');
    this.route('integrating-custom-validators');
    this.route('clonable-form-fields');
    this.route('configure-classnames');
    this.route('input');
    this.route('textarea');
    this.route('single-checkbox');
    this.route('radio-button-group');
    this.route('checkbox-group');
    this.route('static-content-field');
    this.route('power-select');
    this.route('power-select-checkboxes');
    this.route('power-datepicker');
    this.route('clicker');
  });
  this.route('not-found', { path: '/*path' });
});

export default Router;
