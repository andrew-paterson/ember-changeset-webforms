import { dasherize } from '@ember/string';

function safeName(str) {
  if (!str) {
    return;
  }
  str = dasherize(str).toLowerCase();
  str = str.replace(/\s/g, '-').replace(/-+/g, '-').replace(/\./g, '_').replace(/[^0-9a-z_-]/g, '');
  return str;
}

export { safeName as default };
//# sourceMappingURL=safe-name.js.map
