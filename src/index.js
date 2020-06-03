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
    this._viewNumber = 0;
    this._currentNumber = 0;
    this._operatNumber = 0;
    this._operator = null;
  }

  reset() {
    this._currentNumber = 0;
    this._operator = null;
    this._operatNumber = 0;
  }

  set currentNumber(value) {
    this._currentNumber = this._currentNumber ? parseInt((this._currentNumber += String(value)), 10) : value;
    this._viewNumber = this._currentNumber;
  }

  set operatNumber(value) {
    this._operatNumber = this._operatNumber ? parseInt((this._operatNumber += String(value)), 10) : value;
    this._viewNumber = this._operatNumber;
  }

  setNumber(value) {
    if (!this._operator) {
      this.currentNumber = value;
    } else {
      this.operatNumber = value;
    }
  }
  
  setOperator(opt) {
    console.log(this._operator);
    if (this._operator) this.operate();
    this._operator = opt;
  }

  operate() {
    switch (this._operator) {
    case '+': {
      this._currentNumber += this._operatNumber;
      break;
    }
    case '-': {
      this._currentNumber -= this._operatNumber;
      break;
    }
    case '*': {
      this._currentNumber *= this._operatNumber;
      break;
    }
    case '/': {
      this._currentNumber /= this._operatNumber;
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
    this._viewNumber = this._currentNumber;
    this._operatNumber = 0;
    this._operator = null;
  }
}

const calculator = new Calculator();
function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
      <h1 id="result">{calculator._viewNumber}</h1>
      <div>
        <button
          type="button"
          onClick={() => {
            calculator.setNumber(1);
            render();
          }}
        >
          1
        </button>
        <button
          type="button"
          onClick={() => {
            calculator.setNumber(2);
            render();
          }}
        >
          2
        </button>
        <button
          type="button"
          onClick={() => {
            calculator.setNumber(3);
            render();
          }}
        >
          3
        </button>
        <button
          type="button"
          onClick={() => {
            calculator.setNumber(4);
            render();
          }}
        >
          4
        </button>
        <button
          type="button"
          onClick={() => {
            calculator.setNumber(5);
            render();
          }}
        >
          5
        </button>
        <button
          type="button"
          onClick={() => {
            calculator.setNumber(6);
            render();
          }}
        >
          6
        </button>
        <button
          type="button"
          onClick={() => {
            calculator.setNumber(7);
            render();
          }}
        >
          7
        </button>
        <button
          type="button"
          onClick={() => {
            calculator.setNumber(8);
            render();
          }}
        >
          8
        </button>
        <button
          type="button"
          onClick={() => {
            calculator.setNumber(9);
            render();
          }}
        >
          9
        </button>
        <button
          type="button"
          onClick={() => {
            calculator.setNumber(0);
            render();
          }}
        >
          0
        </button>
      </div>

      <div>
        <button
          type="button"
          onClick={() => {
            calculator.setOperator('+');
            render();
          }}
        >
          +
        </button>
        <button
          type="button"
          onClick={() => {
            calculator.setOperator('-');
            render();
          }}
        >
          -
        </button>
        <button
          type="button"
          onClick={() => {
            calculator.setOperator('*');
            render();
          }}
        >
          *
        </button>
        <button
          type="button"
          onClick={() => {
            calculator.setOperator('/');
            render();
          }}
        >
          /
        </button>
        <button
          type="button"
          onClick={() => {
            calculator.operate();
            render();
          }}
        >
          =
        </button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
