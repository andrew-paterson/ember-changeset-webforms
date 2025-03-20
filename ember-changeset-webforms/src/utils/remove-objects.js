import removeObject from './remove-object.js';

export default function removeObjects(items, array) {
  items.forEach((item) => {
    removeObject(array, item);
  });
}
