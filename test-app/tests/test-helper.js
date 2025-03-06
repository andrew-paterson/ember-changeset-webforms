import Application from '../app.js';
import config from '../config/environment.js';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';

setup(QUnit.assert);

setApplication(Application.create(config.APP));

QUnit.config.testTimeout = 10000000000000000;

start();
