import ApplicationController from '../application';

export default class BasicUsage extends ApplicationController {
  get formSchema() {
    return this.loginFormSchema;
  }
}
