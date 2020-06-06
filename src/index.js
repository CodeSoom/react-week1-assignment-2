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

const calculator = (() => {
  let cumulative = 0;
  let operand = 0;
  let operator = '+';

  let inputValue = 0;
  let displayValue = 0;

  const arithmetic = {
    '+': (operand1, operand2) => operand1 + operand2,
    '-': (operand1, operand2) => operand1 - operand2,
    '*': (operand1, operand2) => operand1 * operand2,
    '/': (operand1, operand2) => operand1 / operand2,
  };

  const accumulate = () => {
    operand = inputValue;
    cumulative = arithmetic[operator](cumulative, operand);
  };

  return {
    enterNumber(number) {
      inputValue = inputValue * 10 + number;
      displayValue = inputValue;
    },
    enterSymbol(symbol) {
      accumulate();
      operator = symbol in arithmetic ? symbol : '+';
      inputValue = 0;
      displayValue = cumulative;
      if (symbol === '=') {
        cumulative = 0;
        operand = 0;
      }
    },
    getDisplayValue() {
      return displayValue;
    },
  };
})();

function render(output) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{output}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button
            type="button"
            onClick={() => {
              calculator.enterNumber(number);
              render(calculator.getDisplayValue());
            }}
          >
            {number}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((symbol) => (
          <button
            type="button"
            onClick={() => {
              calculator.enterSymbol(symbol);
              render(calculator.getDisplayValue());
            }}
          >
            {symbol}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0);
