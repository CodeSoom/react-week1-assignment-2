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

const initialState = {
  previousNumber: 0,
  currentNumber: 0,
  operator: '',
};

function render(state) {
  const {
    previousNumber, currentNumber, operator,
  } = state;

  const operatorEvent = {
    '+': (num1, num2) => num1 + num2,
    '-': (num1, num2) => num1 - num2,
    '*': (num1, num2) => num1 * num2,
    '/': (num1, num2) => num1 / num2,
    '=': (num1, num2) => num1 || num2,
    '': (num1, num2) => num1 || num2,
  };

  function onClickNumber(number) {
    if (operator === '=') {
      render({
        ...state,
        previousNumber: 0,
        currentNumber: currentNumber * 10 + number,
      });
      return;
    }
    render({
      ...state,
      currentNumber: currentNumber * 10 + number,
    });
  }

  function onClickOperator(op) {
    render({
      ...state,
      previousNumber: operatorEvent[operator](previousNumber, currentNumber),
      currentNumber: 0,
      operator: op,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{ currentNumber || previousNumber }</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button
            type="button"
            onClick={() => onClickNumber(i)}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((j) => (
          <button
            type="button"
            onClick={() => onClickOperator(j)}
          >
            {j}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
