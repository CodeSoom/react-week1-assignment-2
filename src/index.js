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

class Calculator {
  constructor(count) {
    this.count = count || 0;
    this.result = 0;
  }

  handleClickNumber(number) {
    this.count = this.count * 10 + number;
    this.render();
  }

  handleClickOperator(operator) {
    if (operator === '+') {
      this.result += this.count;
      this.operator = operator;

      this.count = this.result;
      this.render();

      this.count = 0;
    } else if (operator === '=') {
      if (this.operator === '+') {
        this.result += this.count;
        this.count = this.result;
        this.result = 0;
        this.render();
      }
    }
  }

  countElement() {
    return (
      <div>
        <div>
          <p>간단 계산기</p>
        </div>

        <p>{this.count}</p>

        <p>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
            <button type="button" onClick={() => this.handleClickNumber(i)}>
              {i}
            </button>
          ))}
        </p>

        <p>
          {['+', '-', '*', '/', '='].map((i) => (
            <button type="button" onClick={() => this.handleClickOperator(i)}>
              {i}
            </button>
          ))}
        </p>
      </div>
    );
  }

  render() {
    const app = document.getElementById('app');
    app.textContent = '';
    app.appendChild(this.countElement());
  }
}

const calculator = new Calculator();
calculator.render();