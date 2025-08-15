'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    snippetSearchPaths: [
      'app',
      '../ember-changeset-webforms/src/utils',
      '../ember-changeset-webforms/src/test-support',
      'config',
      'tests',
    ],
    'ember-cli-addon-docs': {
      documentingAddonAt: '../ember-changeset-webforms',
    },
  });
  return app.toTree();
};
