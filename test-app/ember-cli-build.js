'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    snippetSearchPaths: [
      'app',
      '../ember-changeset-webforms/src/utils',
      '../validated-changeset-webforms/src/utils',
      'config',
    ],
    'ember-cli-addon-docs': {
      documentingAddonAt: '../ember-changeset-webforms',
    },
  });
  return app.toTree();
};
