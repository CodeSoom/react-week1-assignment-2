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
    beforeResult, operator, result, pointer,
  } = state;

  const OPERATOR_POINTER = 2;
  const NUMBER_POINTER = 3;

  const calculationFunctions = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
    '=': '=',
  };

  function handleClickNumber(number) {
    if (pointer === OPERATOR_POINTER) {
      render({
        ...state, beforeResult: result, result: number, pointer: pointer + 1,
      });
      return;
    }

    render({ ...state, result: (result * 10) + number });
  }

  function handleClickOperator(value) {
    if (pointer === NUMBER_POINTER) {
      render({
        beforeResult: operator(beforeResult, result),
        operator: value,
        result: operator(beforeResult, result),
        pointer: pointer - 1,
      });
      return;
    }

    const nextPointer = (pointer === OPERATOR_POINTER) ? pointer : pointer + 1;
    render({ ...state, operator: value, pointer: nextPointer });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      {result}
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
  before: 0,
  operator: null,
  result: 0,
  pointer: 1,
});
