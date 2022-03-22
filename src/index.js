/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const { log } = console;

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
  }

  handleClickNumber(number) {
    if (this.count === 0) {
      this.count = number;
      this.render();
    } else {
      this.count = this.count * 10 + number;
      this.render();
    }
  }

  handleClickOperator(operator) {
    if (operator === '=') {
      switch (this.operator) {
        case '+':
          this.count = this.leftCount + this.count;
          this.render();
          break;
        case '-':
          this.count = this.leftCount - this.count;
          this.render();
          break;
        case '*':
          this.count = this.leftCount * this.count;
          this.render();
          break;
        case '/':
          this.count = this.leftCount / this.count;
          this.render();
          break;
        default:
          log('연산');
      }
    } else {
      this.operator = operator;
      this.leftCount = this.count;
      this.count = 0;
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
