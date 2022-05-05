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

const { log } = console;

const initialState = {
  prevNumber: 0,
  currentNumber: 0,
  operator: '',
};

function render(state) {
  const {
    prevNumber, currentNumber, operator,
  } = state;

  log(prevNumber, currentNumber, operator);

  function calculate(num1, num2, op) {
    log('여기', '1', num1, '2', num2, 'o', op);
    switch (op) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    default:
      return num1 || num2;
    }
  }

  function onClickNumber(number) {
    if (operator === '=') {
      render({
        ...state,
        prevNumber: 0,
        currentNumber: currentNumber === 0 ? number : currentNumber + number.toString(),
      });
      return;
    }
    render({
      ...state,
      currentNumber: currentNumber === 0 ? number : currentNumber + number.toString(),
    });
  }

  function onClickOperator(op) {
    render({
      ...state,
      prevNumber: calculate(Number(prevNumber), Number(currentNumber), operator),
      currentNumber: 0,
      operator: op,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{ currentNumber || prevNumber }</p>
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
