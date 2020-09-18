const calculate = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

export default class CalculatorState {
  constructor(defaultStore = []) {
    this.store = defaultStore;
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

  calculate() {
    const displayNumber = this.top();
    const waitingOperator = this.operator();
    const waitingNumber = this.bottom();

    return calculate[waitingOperator](waitingNumber, displayNumber);
  }
}
