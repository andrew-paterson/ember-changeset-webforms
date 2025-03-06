import Application from '@ember/application';
import Resolver from './resolver.js';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment.js';
import { registerDateLibrary } from 'ember-power-calendar';
import DateUtils from 'ember-power-calendar-moment';
// import 'ember-power-calendar/styles';
// import 'ember-power-select/styles';

registerDateLibrary(DateUtils);

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
