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

const makeDecimal = (accumulator, currentValue) => accumulator * 10 + currentValue;

function calculate(operand1, operand2, operator) {
  function add() {
    console.log('+');
    return operand1 + operand2;
  }
  function abstract() {
    console.log('-');
    return operand1 - operand2;
  }
  function multiply() {
    console.log('*');
    return operand1 * operand2;
  }
  function divide() {
    console.log('/');
    return operand1 / operand2;
  }
  function equal() {
    console.log('=');
    return 0;
  }
  return new Map([['+', add()], ['-', abstract], ['*', multiply], ['/', divide], ['=', equal]])[operator];
}

function render(input, num) {
  const element = (
    <div id="hello" className="greeting">
      <p>간단 계산기</p>

      <p>
        {num}
      </p>

      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button
            type="button"
            onClick={() => {
              render(input.concat(i),
                calculate(input.concat(i).reduce(makeDecimal), num));
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
            onClick={() => {
              render([], num);
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

render([], 0);
