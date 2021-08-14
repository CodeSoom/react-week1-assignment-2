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

function render(state = {
  leftNumber: 0,
  rightNumber: 0,
  operator: null,
  result: 0,
}) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  };

  function handleClickNumber(number) {
    if (state.operator) {
      render({
        ...state,
        rightNumber: state.rightNumber * 10 + number,
        result: state.rightNumber * 10 + number,
      });
      return;
    }

    render({
      ...state,
      leftNumber: state.leftNumber * 10 + number,
      result: state.leftNumber * 10 + number,
    });
  }

  function handleClickOperator(pattern) {
    if (!state.operator || (state.operator && !state.rightNumber)) {
      render({ ...state, operator: pattern });
      return;
    }

    render({
      leftNumber: operators[state.operator](state.leftNumber, state.rightNumber),
      rightNumber: 0,
      operator: pattern,
      result: operators[state.operator](state.leftNumber, state.rightNumber),
    });
  }

  function handleClickEqual() {
    render({
      leftNumber: 0,
      rightNumber: 0,
      operator: null,
      result: operators[state.operator](state.leftNumber, state.rightNumber),
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {state.result}
      </p>
      <p>
        {numbers.map((number) => (
          <button type="button" onClick={() => handleClickNumber(number)}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {Object.keys(operators).map((pattern) => (
          <button type="button" onClick={() => handleClickOperator(pattern)}>
            {pattern}
          </button>
        ))}
        <button type="button" onClick={() => handleClickEqual()}>
          =
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
