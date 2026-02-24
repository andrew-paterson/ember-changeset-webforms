export default class Option {
  label: string;
  value: string | number | boolean;
  key: string | number | boolean;

  constructor(args) {
    for (const key in args) {
      this[key] = args[key];
    }
  }
}
