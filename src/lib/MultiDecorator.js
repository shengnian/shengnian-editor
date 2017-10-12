import Immutable from 'immutable'

const KEY_SEPARATOR = '-';

export default class MultiDecorator {
  constructor(decorators) {
    this.decorators = Immutable.List(decorators);
  }

  getDecorations (block, contentState) {
    let decorations = Array(block.getText().length).fill(null);

    this.decorators.forEach(function(decorator, i) {
      let _decorations = decorator.getDecorations(block, contentState);

      _decorations.forEach(function(key, offset) {
        if (!key) {
          return;
        }

        key = i + KEY_SEPARATOR + key;

        decorations[offset] = key;
      });
    });

    return Immutable.List(decorations);
  }


  getComponentForKey = (key) => {
    let decorator = this.getDecoratorForKey(key);
    return decorator.getComponentForKey(
      this.getInnerKey(key)
    );
  }

  getPropsForKey = (key) => {
    let decorator = this.getDecoratorForKey(key);
    return decorator.getPropsForKey(
      this.getInnerKey(key)
    );
  }

  getDecoratorForKey = (key) => {
    let parts = key.split(KEY_SEPARATOR);
    let index = Number(parts[0]);

    return this.decorators.get(index);
  }


  getInnerKey = (key) => {
    let parts = key.split(KEY_SEPARATOR);
    return parts.slice(1).join(KEY_SEPARATOR);
  }
}

