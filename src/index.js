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

const clicked = {
  count: 0,
};

const operators = [];
let digit = [];
let res = 0;
let operand1 = 0;
let operand2 = 0;

const reducer = (accumulator, currentValue) => accumulator * 10 + currentValue;

function render() {
  const element = (
    <div id="hello" className="greeting">
      <p>간단 계산기</p>
      <p>
        {res}
      </p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button
            type="button"
            onClick={(num) => {
              digit.push(num);
              operand1 = digit.reduce(reducer);
              console.log(`operand1: ${operand1}`);
              render();
            }}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button
            type="button"
            onClick={(operator) => {
              if (operator === '=') {
                console.log(`operand1 : ${operand1}`);
                console.log(`operand2 : ${operand2}`);
                console.log(`result : ${operand1}${operand2}`);
                while (!operators.length === 0) {
                  switch (operators.shift) {
                    case '+':
                      res = operand1 + operand2;
                      break;
                    case '-':
                      res = operand1 - operand2;
                      break;
                    case '*':
                      res = operand1 * operand2;
                      break;
                    case '/':
                      res = operand1 / operand2;
                      break;
                  }
                }
              } else {
                operators.push(operator);
                operand2 = operand1;
              }
              operand1 = 0;
              digit = [];
              render();
            }}
          >
            {i}
          </button>
        ))}
      </p>
    </div>
  );
  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
