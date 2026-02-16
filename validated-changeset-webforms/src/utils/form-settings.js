export default class FormSettings {
  constructor(args) {
    for (const key in args) {
      this[key] = args[key];
    }
  }
}
