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

function render(state) {
  const {
    previousNumber, operator, afterNumber, resultNumber,
  } = state;
  function handleClickNumber(number) {
    const nextNumber = (afterNumber === null ? 0 : (resultNumber * 10)) + number;
    render({
      ...state, afterNumber: nextNumber, resultNumber: nextNumber,
    });
  }

  function handleClickOperator(inputOperator) {
    if (inputOperator === '=') {
      render({ resultNumber: operator(previousNumber, afterNumber) });
      return;
    }

    if (previousNumber === null) {
      render({
        ...state,
        previousNumber: afterNumber,
        operator: inputOperator,
        afterNumber: null,
      });
      return;
    }

    if (afterNumber === null) {
      render({
        ...state,
        operator: inputOperator,
        afterNumber: null,
      });
      return;
    }

    render({
      previousNumber: operator(previousNumber, afterNumber),
      operator: inputOperator,
      afterNumber: null,
      resultNumber: operator(previousNumber, afterNumber),
    });
  }

  const calculationFunctions = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
    '=': '=',
  };
  const element = (
    <div>
      <p>간단 계산기</p>
      {resultNumber}
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>

      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button type="button" onClick={() => handleClickOperator(calculationFunctions[i])}>
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  previousNumber: null,
  operator: null,
  afterNumber: null,
  resultNumber: 0,
});
