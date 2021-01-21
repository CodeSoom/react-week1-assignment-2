/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

class Stack {
  constructor() {
    this.store = [];
  }

  push(item) {
    this.store.push(item);
  }

  pop() {
    return this.store.pop();
  }

  size() {
    return this.store.length;
  }
}

class Calculator {
  constructor() {
    this.state = { number: 0 };
    this.stack = new Stack();
  }

  operate() {
    if (this.stack.size() < 2) return;
    const op = this.stack.pop();
    const popedNumber = this.stack.pop();

    switch (op) {
    case '+':
      this.state.number += popedNumber;
      break;
    case '-':
      this.state.number = popedNumber - this.state.number;
      break;
    case '*':
      this.state.number *= popedNumber;
      break;
    case '/':
      this.state.number = popedNumber / this.state.number;
      break;
    default:
      break;
    }
    this.stack.push(this.state.number);
    this.render();
  }

  addDigitRight(number) {
    this.state.number = this.state.number * 10 + number;
    this.render();
  }

  getResult() {
    this.operate();
    this.stack.pop();
    this.state.number = 0;
  }

  plus() {
    this.operate();
    this.stack.push(this.state.number);
    this.stack.push('+');
    this.state.number = 0;
  }

  minus() {
    this.operate();
    this.stack.push(this.state.number);
    this.stack.push('-');
    this.state.number = 0;
  }

  multiply() {
    this.operate();
    this.stack.push(this.state.number);
    this.stack.push('*');
    this.state.number = 0;
  }

  divide() {
    this.operate();
    this.stack.push(this.state.number);
    this.stack.push('/');
    this.state.number = 0;
  }

  render() {
    const element = (
      <div>
        <p>간단 계산기</p>
        <p>{this.state.number}</p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => this.addDigitRight(i)}>
            {i}
          </button>
        ))}
        <p>
          <button type="button" onClick={() => this.plus()}>+</button>
          <button type="button" onClick={() => this.minus()}>-</button>
          <button type="button" onClick={() => this.multiply()}>*</button>
          <button type="button" onClick={() => this.divide()}>/</button>
          <button type="button" onClick={() => this.getResult()}>=</button>
        </p>

      </div>
    );

    document.getElementById('app').textContent = '';
    document.getElementById('app').appendChild(element);
  }
}

const calculator = new Calculator();
calculator.render();
