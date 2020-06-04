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
  constructor() {
    this.viewNumber = 0;
    this.currentNumber = 0;
    this.operatNumber = 0;
    this.operator = null;
  }

  set setViewNumber(value) {
    this.viewNumber = value;
  }

  set setCurrentNumber(value) {
    if (this.currentNumber) {
      this.currentNumber = parseInt((this.currentNumber += String(value)), 10);
    } else {
      this.currentNumber = value;
    }
  }

  set setOperatNumber(value) {
    if (this.operatNumber) {
      this.operatNumber = parseInt((this.operatNumber += String(value)), 10);
    } else {
      this.operatNumber = value;
    }
  }

  reset() {
    this.currentNumber = 0;
    this.operator = null;
    this.operatNumber = 0;
  }

  setNumber(value) {
    if (!this.operator) {
      this.setCurrentNumber = value;
      this.setViewNumber = this.currentNumber;
    } else {
      this.setOperatNumber = value;
      this.setViewNumber = this.operatNumber;
    }
  }

  setOperator(opt) {
    if (this.operator) this.operate();
    this.operator = opt;
  }

  operate() {
    console.log(this.operator);
    switch (this.operator) {
      case '+': {
        this.currentNumber += this.operatNumber;
        break;
      }
      case '-': {
        this.currentNumber -= this.operatNumber;
        break;
      }
      case '*': {
        this.currentNumber *= this.operatNumber;
        break;
      }
      case '/': {
        this.currentNumber /= this.operatNumber;
        break;
      }
      case '=': {
        this.reset();
        break;
      }
      default: {
        break;
      }
    }
    this.viewNumber = this.currentNumber;
    this.operatNumber = 0;
    this.operator = null;
  }
}

const calculator = new Calculator();
function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
      <h1 id="result">{calculator.viewNumber}</h1>
      <div>
        {[...Array(10).keys()].map((number, i) => (
          <button
            type="button"
            onClick={() => {
              calculator.setNumber(number);
              render();
            }}
          >
            {number}
          </button>
        ))}
      </div>

      <div>
        {['+', '-', '*', '/', '='].map((operator) => {
          return (
            <button
              type="button"
              onClick={() => {
                calculator.setOperator(`${operator}`);
                render();
              }}
            >
              {operator}
            </button>
          );
        })}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
