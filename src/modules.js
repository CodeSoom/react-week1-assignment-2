export const Calculate = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

export class Stack {
  constructor(defaultStore = []) {
    this.store = defaultStore;
  }

  push(value) {
    this.store.push(value);
  }

  pop() {
    return this.store.pop();
  }

  size() {
    return this.store.length;
  }

  top() {
    return this.store[this.size() - 1];
  }

  bottom() {
    return this.store[0];
  }

  operator() {
    return this.store[1];
  }
}
